import ProductViews from "@/views/Products";
import { useRouter } from "next/router";

const ProductsPage = () => {
    const { query } = useRouter();
    const promo = query.promo == 'true';

    return (
        <>
            <ProductViews promo={promo}></ProductViews>
        </>
    )
}

export default ProductsPage;