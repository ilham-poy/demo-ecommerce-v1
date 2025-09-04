import type { NextApiRequest, NextApiResponse } from "next";
import { deleteContentById } from "../utils/db/service";
// type Data = {
//     status: boolean,
//     statusCode: number,
//     message: string
//     data: any;
// };
type Data = {
    status: boolean,
    message: string
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {

    if (req.method === "DELETE") {
        await deleteContentById(req.body, ({ status, message }: { status: boolean; message: string }) => {
            if (status) {
                res.status(200).json({ status, message })
            } else {
                res.status(400).json({ status, message })
            }
        })
    } else {
        res.status(405).json({ status: false, message: 'Method Not Allowed' })
    }

}