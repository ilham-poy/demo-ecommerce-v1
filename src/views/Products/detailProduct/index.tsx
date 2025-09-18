import styles from './DetailProduct.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import Card from '../Card/card';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
type productType = {
    id: number,
    name: string,
    price: number,
    active: boolean,
    stock: number,
    image: string[],
    discount: number,
    discount_status: boolean,
    category: string,
    affiliate: string,
    description: string
}


const DetailProduct = ({ product }: { product: productType }) => {
    const [image, setImage] = useState(0);
    const [products, setProducts] = useState([]);

    const handleLeft = (image: number) => {
        product.image.forEach(img => {
            setImage(image - 1);
        });
    }
    const handleRight = (image: number) => {
        product.image.forEach(img => {

            setImage(image + 1);

        });
    }
    useEffect(() => {
        fetch('/api/products/product')
            .then((res) => res.json())
            .then((response) => {
                setProducts(response.data);
            });
    }, [])
    return (
        <div className='min-h-screen w-full items-center flex flex-col  justify-center'>
            <div className="max-w-[1000px] mx-auto p-8 font-sans">
                <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Image Column */}
                    <div className={`flex-1 flex justify-center items-center p-8 ${styles.slideInLeft} ${styles.delay200}`}>
                        <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-lg shadow-md">
                            {product.image?.[image] ? (
                                <img
                                    src={product.image[image]}
                                    alt={`Product ${image}`}
                                    className="w-full h-full object-cover rounded-lg object-top transition-transform duration-300 ease-in-out"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                                    Gambar tidak tersedia
                                </div>
                            )}

                            {image > 0 && (
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    onClick={() => handleLeft(image)}
                                    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black bg-white/40 p-2 rounded-full cursor-pointer hover:bg-white hover:text-pink-400 transition duration-200 z-10"
                                />
                            )}

                            {product.image?.length > 1 && image < product.image.length - 1 && (
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    onClick={() => handleRight(image)}
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black bg-white/40 p-2 rounded-full cursor-pointer hover:bg-white hover:text-pink-400 transition duration-200 z-10"
                                />
                            )}
                        </div>
                    </div>

                    {/* Info Column */}
                    <div className={`flex-1 p-8 flex flex-col ${styles.slideInRight} ${styles.delay400}`}>
                        <h1 className={`text-4xl font-bold text-gray-900 mb-2 ${styles.fadeIn} ${styles.delay600}`}>
                            {product.name}
                        </h1>

                        <div className="flex items-center mb-2 text-pink-500 font-semibold">
                            <FontAwesomeIcon
                                icon={faStore}
                                className="border-2 border-pink-400 p-1 rounded-full text-pink-500 text-sm mr-2"
                            />
                            NasywaArtSpace
                        </div>



                        {product.discount > 0 && product.discount_status === true ? (
                            <>
                                <p className={`text-lg text-pink-400 font-bold  line-through ${styles.fadeIn} ${styles.delay800}`}>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(product.price)}
                                </p>
                                <p className="text-base text-pink-400 font-semibold text-muted-foreground mb-4 animate-in fade-in duration-1000">
                                    Discount up to {product.discount}%
                                </p>
                                <p className={`text-xl mb text-pink-400 font-bold align-middle ${styles.fadeIn} ${styles.delay800}`}>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(product.price * (1 - product.discount / 100))}
                                    <span className={`text-sm font-semibold mx-2 text-white bg-pink-500 px-2.5 py-1  hover:bg-pink-600 transition cursor-pointer  ${styles.fadeIn} ${styles.delay800}`}>
                                        Now
                                    </span>
                                </p>

                            </>
                        ) : (
                            <>
                                <p className="text-xl mb-2 text-pink-400 font-bold ">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(product.price)}
                                </p>
                            </>
                        )}




                        <div className={`text-base text-pink-400 leading-relaxed mb-8 font-medium ${styles.fadeIn} ${styles.delay1000}`}>
                            {product.stock < 10 ? (
                                "Buruan Dibeli Stocknya Terbatas"
                            ) : (
                                `Sisa Stock : ${product.stock}`
                            )}
                        </div>


                        <p className={`text-base text-gray-700 leading-relaxed mb-8 ${styles.fadeIn} ${styles.delay1000}`}>
                            {product.description}
                        </p>

                        {product.affiliate && product.active && (
                            <Link
                                href={product.affiliate}
                                className={`px-6 py-3 bg-pink-400 text-white text-lg font-bold rounded-lg hover:bg-pink-500 transition duration-300 self-start ${styles.fadeIn} ${styles.delay1200}`}
                            >
                                Beli Sekarang
                            </Link>
                        )}
                    </div>
                </div>
            </div >

            <div className="w-full max-w-5xl">
                <Card products={products} />
            </div>
        </div>

    )
}
export default DetailProduct;