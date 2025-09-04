import Card from "@/views/Products/Card/card";
type productType = {
    id: number,
    name: string,
    price: number,
    image: string,
    category: string

}
// Ini Server Side rendering
const ServerSidePage = (props: { products: productType[] }) => {
    const { products } = props;
    return (
        <div>
            <h1> Halamaan Server Side Rendering</h1>
            <Card products={products}></Card>
        </div>
    )
}
export default ServerSidePage;

export async function getServerSideProps() {
    //fetch api
    const res = await fetch('http://localhost:3000/api/product')
    const response = await res.json();

    return {
        props: {
            products: response.data
        }
    }
}