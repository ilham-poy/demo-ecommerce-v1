import type { NextApiRequest, NextApiResponse } from "next";
import { getContent, sendContentById } from "../../utils/db/service";
type Data = {
    status: boolean,
    statusCode: number,
    message: string
    data: any;
};
// type Data = {
//     status: boolean,
//     message: string
// };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    // if (req.query.content) {
    //     console.log(req.query.content)
    //     const data = await sendContentById('content', req.query.content![1]);
    //     res.status(200).json({ status: true, statusCode: 200, data });
    // } else {
    const data = await getContent('content');
    res.status(200).json({ status: true, statusCode: 200, message: 'Success', data });
    // }




    // if (req.method === "POST") {
    //     await sendContentById(req.body, ({ status, message }: { status: boolean; message: string }) => {
    //         if (status) {
    //             res.status(200).json({ status, message })
    //         } else {
    //             res.status(400).json({ status, message })
    //         }
    //     })
    // } else {
    //     res.status(405).json({ status: false, message: 'Method Not Allowed' })

    // }

}