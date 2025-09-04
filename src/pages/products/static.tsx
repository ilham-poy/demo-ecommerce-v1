// import Card from "@/views/Products/Card/card";
// type productType = {
//     id: number,
//     name: string,
//     price: number,
//     image: string,
//     category: string

// }
// // Ini Server Side rendering
// const StaticSideGeneration = (props: { products: productType[] }) => {
//     const { products } = props;
//     return (
//         <div>
//             <h1> Halamaan Static Side Generation</h1>
//             <p>Klo mau liat perubahan harus build ulang</p>
//             <Card products={products}></Card>
//         </div>
//     )
// }
// export default StaticSideGeneration;

// export async function getStaticProps() {
//     //fetch api
//     const res = await fetch('http://localhost:3000/api/product')
//     const response = await res.json();

//     return {
//         props: {
//             products: response.data
//         },
//         revalidate: 10
//     }
// }