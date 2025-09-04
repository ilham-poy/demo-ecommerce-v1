// import type { NextApiRequest, NextApiResponse } from "next";
// import { getContent, sendContentById } from "../utils/db/service";
// // type Data = {
// //     status: boolean,
// //     statusCode: number,
// //     message: string
// //     data: any;
// // };
// type Data = {
//     status: boolean,
//     message: string
// };

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Data>,
// ) {

//     if (req.method === "POST") {
//         await sendContentById(req.body, ({ status, message }: { status: boolean; message: string }) => {
//             if (status) {
//                 res.status(200).json({ status, message })
//             } else {
//                 res.status(400).json({ status, message })
//             }
//         })
//     } else {
//         res.status(405).json({ status: false, message: 'Method Not Allowed' })
//     }

// }


import type { NextApiRequest, NextApiResponse } from "next";
import { put, del } from "@vercel/blob";
import { sendContentById } from "../utils/db/service";
import busboy from "busboy";
import { randomUUID } from "crypto";

type Data = {
    status: boolean;
    message: string;
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        try {
            const formData = await new Promise<any>((resolve, reject) => {
                const bb = busboy({ headers: req.headers });
                const data: any = {};
                const uploads: Promise<void>[] = [];

                //Menangkap input bertipe file → kamu ngumpulin buffer → lalu di-upload ke Vercel Blob pakai put.
                bb.on("file", (_: any, file: any, info: any) => {
                    const { filename, mimeType } = info;
                    const chunks: Buffer[] = [];

                    file.on("data", (chunk: Buffer) => {
                        chunks.push(chunk);
                    });

                    file.on("end", () => {
                        const buffer = Buffer.concat(chunks);

                        if (buffer.length === 0) return;
                        // push promise upload ke array
                        uploads.push(
                            (async () => {
                                const uniqueName = `${Date.now()}-${randomUUID()}-${filename}`;
                                const { url } = await put(`content/${uniqueName}`, buffer, {
                                    access: "public",
                                    contentType: mimeType,
                                });
                                data.image = url;
                            })()
                        );
                    });
                });

                bb.on("field", (name: any, val: any) => {
                    data[name] = val;


                });

                bb.on("close", async () => {
                    try {
                        await Promise.all(uploads); // tunggu semua upload selesai
                        resolve(data);
                    } catch (err) {
                        reject(err);
                    }
                });

                req.pipe(bb);
            });
            const parsedData = {
                ...formData,
                active: formData.active === "true" ? true : false,
                "hero-image": formData["hero-image"] === "true" ? true : false,
            };

            // simpan ke Firestore
            await sendContentById(parsedData, ({ status, message }: any) => {
                if (status) {
                    res.status(200).json({ status: true, message: 'Upload Success' });
                } else {
                    res.status(400).json({ status: false, message: 'Upload Failed' });
                }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ status: false, message: "Upload failed" });
        }
    } else {
        res.status(405).json({ status: false, message: "Method Not Allowed" });
    }
}
