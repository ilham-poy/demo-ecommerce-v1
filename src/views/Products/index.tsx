import Card from "./Card/card"
import { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type productType = {
    id: number,
    name: string,
    price: number,
    image: string,
    category: string
}

export default function ProductViews(props: any) {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    // const [totalProducts, setTotalProducts] = useState(0);
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch('/api/products/product')
            .then((res) => res.json())
            .then((response) => {
                setAllProducts(response.data);
                setProducts(response.data);
            });
    }, [])


    const cariKata = () => {
        const keyword = search.toLowerCase().trim();
        const filterProduct = products.filter((product: productType) => product.name.toLowerCase().includes(keyword))
        setProducts(filterProduct)
        // setTotalProducts(filterProduct.length)
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6 space-y-6">
            {/* Search Section */}
            <div className="flex flex-col md:flex-row items-end gap-4">
                <div className="relative w-full  md:w-64">
                    {/* Search Icon */}
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 w-4 h-4"
                    />

                    {/* Input Field */}
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearch(value);
                            if (value.trim() === "") {
                                setProducts(allProducts);
                                // setTotalProducts(allProducts.length);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") cariKata();
                        }}
                        className="pl-10 pr-4 py-2 w-full border border-pink-500 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                        placeholder="Cari produk..."
                    />
                </div>
                <button
                    onClick={cariKata}
                    className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600  transition"
                >
                    Cari
                </button>
            </div>


            {/* Product Cards */}
            <div className="w-full max-w-5xl">
                <Card products={products} />
            </div>
        </div>

    )
}