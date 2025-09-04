import type { NextApiRequest, NextApiResponse } from "next";
import { put } from "@vercel/blob";
import { sendProductById } from "../../utils/db/service";
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
                                const { url } = await put(`products/${uniqueName}`, buffer, {
                                    access: "public",
                                    contentType: mimeType,
                                });
                                if (!Array.isArray(data.image)) {
                                    data.image = [];
                                }
                                data.image.push(url);
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
                stock: Number(formData.stock),
                discount: Number(formData.discount),
                price: Number(formData.price),
                IsAffiliate: formData.IsAffiliate === 'true' ? true : false,
                'discount_status': formData.discount_status === "true" ? true : false,
                active: formData.status === "true" ? true : false,
            };
            //Data form image kan array jadiin satu satu terus push

            // simpan ke Firestore
            await sendProductById(parsedData, ({ status, message }: any) => {
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
    }
    else {
        res.status(405).json({ status: false, message: "Method Not Allowed" });
    }
}
