// import type { NextApiRequest, NextApiResponse } from "next";
// import { put } from "@vercel/blob";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "POST") return res.status(405).end();

//     const { fileName } = req.body;

//     // Buat signed URL (upload token)
//     const { url } = await put(`content/${fileName}`, Buffer.from(""), {
//         access: "public",
//         multipart: true, // ini biar bisa direct upload
//     });

//     res.status(200).json({ url });
// }
