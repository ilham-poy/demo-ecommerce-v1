import Card from "./Card/card"
import { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp } from "firebase/firestore";
type productType = {
    id: number,
    name: string,
    stock: number,
    price: number,
    createdAt: Timestamp;
    discount_status: boolean,
    IsAffiliate: boolean,
    image: string,
    category: string
}
type ProductViewsProps = {
    promo: boolean;
};

export default function ProductViews({ promo }: ProductViewsProps) {
    const [isPromo, setIsPromo] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/products/product')
            .then((res) => res.json())
            .then((response) => {
                setAllProducts(response.data);
                setProducts(response.data);
            });
    }, [])


    const filterCategory = (label: string) => {
        if (isPromo) {
            setIsPromo(false)
        }
        const updatedCategory = category.includes(label)
            ? category.filter((item) => item !== label)
            : [...category, label];

        setCategory(updatedCategory);
    }
    useEffect(() => {
        let filtered = allProducts;
        const sekarang = new Date();
        const sepuluhHariLalu = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);


        if (category.length > 0) {
            filtered = allProducts.filter((product: productType) => {
                //check klo created at bukan number maka false, dan akan lanjut ke const createdAtDate
                // klo hasil check true maka akan return false
                // TODO tujuannya mendapat false agar bisa di timestap
                if (!product.createdAt || typeof product.createdAt.seconds !== 'number' || typeof product.createdAt.nanoseconds !== 'number') {
                    return false; // skip produk yang tidak valid
                }

                const createdAtDate = new Timestamp(
                    product.createdAt.seconds,
                    product.createdAt.nanoseconds
                ).toDate();
                return (
                    (category.includes('Promo') && product.discount_status === true) ||
                    (category.includes('Affiliate') && product.IsAffiliate === true) ||
                    (category.includes('Terbaru') &&
                        createdAtDate >= sepuluhHariLalu &&
                        createdAtDate <= sekarang)
                );
            });
        }

        setProducts(filtered);
    }, [category]);


    const cariKata = () => {
        const keyword = search.toLowerCase().trim();
        const filterProduct = products.filter((product: productType) => product.name.toLowerCase().includes(keyword))
        setProducts(filterProduct)
        // setTotalProducts(filterProduct.length)
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6 space-y-6">
            {/* Search Section */}
            <nav className="bg-white shadow-sm px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Kategori Filter */}
                <div className="flex flex-wrap gap-4">
                    {/* Promo */}
                    <label className="flex items-center gap-2 px-4 py-2 border border-pink-500 rounded-md cursor-pointer transition hover:bg-pink-50">
                        <input
                            type="checkbox"
                            checked={promo || category.includes('Promo')}
                            onChange={() => filterCategory('Promo')}
                            className="accent-pink-500 w-4 h-4"
                        />
                        <span className="text-sm font-medium text-pink-500">Promo</span>
                    </label>

                    {/* Affiliate */}
                    <label className="flex items-center gap-2 px-4 py-2 border border-pink-500 rounded-md cursor-pointer transition hover:bg-pink-50">
                        <input
                            type="checkbox"
                            checked={category.includes('Affiliate')}
                            onChange={() => filterCategory('Affiliate')}
                            className="accent-pink-500 w-4 h-4 border border-pink-400"
                        />
                        <span className="text-sm font-medium text-pink-500">Affiliate</span>
                    </label>

                    {/* Stock Terdikit */}
                    <label className="flex items-center gap-2 px-4 py-2 border border-pink-500 rounded-md cursor-pointer transition hover:bg-pink-50">
                        <input
                            type="checkbox"
                            checked={category.includes('Terbaru')}
                            onChange={() => filterCategory('Terbaru')}
                            className="accent-pink-500 w-4 h-4"
                        />
                        <span className="text-sm font-medium text-pink-500">Terbaru</span>
                    </label>
                </div>



                {/* Search Bar */}
                <div className="flex flex-col md:flex-row items-end gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 w-4 h-4"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearch(value);
                                if (value.trim() === '') {
                                    setProducts(allProducts);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') cariKata();
                            }}
                            className="pl-10 pr-4 py-2 w-full border border-pink-500 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                            placeholder="Cari produk..."
                        />
                    </div>
                    <button
                        onClick={cariKata}
                        className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
                    >
                        Cari
                    </button>
                </div>
            </nav>


            {/* Product Cards */}
            <div className="w-full max-w-5xl">
                <Card products={products} />
            </div>
        </div>

    )
}