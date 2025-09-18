import { useRouter } from "next/router";
import useSWR from 'swr';
import DetailProduct from "@/views/Products/detailProduct";
import { useState } from "react";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
type productType = {
    id: number,
    name: string,
    price: number,
    image: string,
    category: string

}
const DetailProductPage = () => {
    // client
    const { query } = useRouter()
    const { data, error, isLoading } = useSWR(`/api/products/product/${query.product}`, fetcher)


    return (
        <>
            <DetailProduct product={isLoading ? [] : data.data} />

        </>
    )
}


// export async function getServerSideProps({ params }: { params: { product: string } }) {

//     const res = await fetch(`http://localhost:3000/api/product/${params.product}`)
//     const response = await res.json();
//     const data = response.data
//     console.log(data)
//     return {
//         props: {
//             product: data,
//         }
//     }
// }

export default DetailProductPage;