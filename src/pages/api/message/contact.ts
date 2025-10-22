import type { NextApiRequest, NextApiResponse } from "next";
import { put, del } from "@vercel/blob";
import busboy from "busboy";
import { contactMessage } from "@/utils/db/service";
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

                        // Skip upload kalau tidak ada isi file
                        if (buffer.length === 0) return;

                        // Pastikan data.image selalu array
                        if (!Array.isArray(data.image)) {
                            data.image = [];
                        }

                        uploads.push(
                            (async () => {
                                const uniqueName = `${Date.now()}-${randomUUID()}-${filename}`;
                                const { url } = await put(`messages/${uniqueName}`, buffer, {
                                    access: "public",
                                    contentType: mimeType,
                                    ...({ headers: { "x-content-length": buffer.length.toString() } } as any),
                                });
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
                        // Jalankan hanya jika ada upload
                        if (uploads.length > 0) {
                            await Promise.all(uploads);
                        }

                        // Kalau user tidak upload gambar, set default image = []
                        if (!Array.isArray(data.image)) {
                            data.image = [];
                        }

                        resolve(data);
                    } catch (err) {
                        console.error("Upload error:", err);
                        reject(err);
                    }
                });


                req.pipe(bb);
            });
            const parsedData = {
                ...formData,
                quantity: Number(formData.quantity),
            };

            // simpan ke Firestore
            const result = await contactMessage(parsedData);

            // const result = await contactMessage(parsedData);
            if (result?.status) {
                res.status(200).json({
                    status: true,
                    message: result.data,
                });
            } else {
                res.status(400).json({
                    status: false,
                    message: result?.message,
                });
            }
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ status: false, message: "Upload failed" });
        }
    } else {
        res.status(405).json({ status: false, message: "Method Not Allowed" });
    }
}


