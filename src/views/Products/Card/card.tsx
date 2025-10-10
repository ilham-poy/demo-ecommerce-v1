import Link from 'next/link';
import styles from './Products.module.css';
import { useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
type productType = {
    id: number,
    name: string,
    active: boolean,
    price: number,
    createdAt: Timestamp,
    discount: number,
    discount_status: boolean,
    affiliate: string,
    image: string,
    category: string
}
const Card = ({ products }: { products: productType[] }) => {
    const isNewProduct = (createdAt: any): boolean => {
        //check klo created at bukan number maka false, dan akan lanjut ke const createdAtDate
        // klo hasil check true maka akan return false
        // TODO tujuannya mendapat false agar bisa di timestap
        if (
            !createdAt ||
            typeof createdAt.seconds !== 'number' ||
            typeof createdAt.nanoseconds !== 'number'
        ) {
            return false;
        }

        const createdAtDate = new Timestamp(
            createdAt.seconds,
            createdAt.nanoseconds
        ).toDate();

        const now = new Date();
        const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

        return createdAtDate >= tenDaysAgo && createdAtDate <= now;
    };



    return (

        <div className="max-w-full mx-auto px-2 py-2 sm:px-4 sm:py-4 font-sans">
            <h1 className="text-center text-[1.5rem] sm:text-[2.5rem] text-pink-500 font-semibold mb-10">
                Koleksi Produk
                <span className='px-3  hover:text-pink-600 hover:underline'>
                    NasywaArtSpace
                </span>
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center items-center">
                {products
                    .filter((product: productType) => product.affiliate && product.active)
                    .map((product: productType) => (

                        <div
                            className="bg-white rounded-xl shadow-md max-w-full flex flex-col overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg"
                        >
                            <Link
                                href={`/products/${product.id}`}
                                key={product.id}
                            >
                                <div className="w-full aspect-square overflow-hidden p-2">
                                    <img
                                        src={product.image[0]}
                                        alt={product.name}
                                        draggable={false}
                                        className="w-full h-full object-cover object-top rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 pointer-events-none select-none"
                                    />
                                </div>

                                <div className="px-3 py-3 text-start items-center flex-grow">
                                    {isNewProduct(product.createdAt)
                                        ? (
                                            <span className="text-end text-sm sm:text-base text-pink-500 font-bold hover:underline transition cursor-pointer">
                                                New
                                            </span>
                                        )
                                        : (<span className="text-transparent text-sm sm:text-base  font-bold hover:underline transition cursor-pointer">
                                            New
                                        </span>)
                                    }
                                    <h2 className="text-base sm:text-[1.25rem] font-semibold text-gray-800 mb-2">
                                        {product.name}
                                    </h2>
                                    <div className="p-1 box-border">
                                        {product.discount > 0 && product.discount_status === true ? (
                                            <>
                                                <p className="text-xs sm:text-[1rem] font-bold text-pink-400 line-through">
                                                    {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }).format(product.price)}
                                                </p>
                                                <p className="text-xs sm:text-[1rem] font-bold text-pink-500 flex items-center gap-1">
                                                    {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }).format(product.price * (1 - product.discount / 100))}
                                                    <span className="text-xs font-semibold text-white bg-pink-500 px-2.5 py-1  hover:bg-pink-600 transition cursor-pointer">
                                                        Now
                                                    </span>

                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-xs sm:text-[.8rem] font-bold text-transparent">Rp0</p> {/* Placeholder agar tinggi tetap */}
                                                <p className="text-base sm:text-[1rem] font-bold text-pink-500">
                                                    {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }).format(product.price)}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>


                            </Link>
                            <Link
                                href={product.affiliate}>
                                <button className="w-full py-4 border-t border-white bg-pink-500 text-white text-[1rem] font-bold transition-colors duration-300 hover:bg-pink-600">
                                    Beli Sekarang
                                </button>
                            </Link>
                        </div>
                    ))}
            </div>
        </div >

    )
}


export default Card;