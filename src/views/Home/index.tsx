import Head from "next/head";
import Image from "next/image";
import styles from './Home.module.css';
import { useEffect, useState } from "react";
import Link from "next/link";


type productType = {
    id: number,
    affiliate: string,
    name: string,
    price: number,
    active: boolean,
    image: string,
    category: string
}

type contentType = {
    id: string;
    name: string;
    image: string;
    active: boolean;
    "hero-image": boolean;
};

export default function HomeViews(
    {
        contents,
        products,
    }: {
        contents: contentType[];
        products: productType[];
    }) {

    const heroContents = contents.filter((c) => c["hero-image"] && c.active);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = maju, -1 = mundur

    useEffect(() => {
        if (heroContents.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                let nextIndex = prev + direction;

                // kalau sampai akhir → balik arah
                if (nextIndex >= heroContents.length) {
                    setDirection(-1);
                    return prev - 1; // mundur
                }

                // kalau sampai awal → balik arah
                if (nextIndex < 0) {
                    setDirection(1);
                    return prev + 1; // maju
                }

                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [heroContents.length, direction]);


    const [randomProducts, setRandomProducts] = useState<productType[]>([]);
    // const [randomProducts, setRandomProducts] = useState<productType[]>([]);

    useEffect(() => {
        if (products.length > 0) {
            const shuffled = [...products].sort(() => Math.random() - 0.5).slice(0, 7);
            setRandomProducts(shuffled);
        }
    }, [products]);

    const safe = (i: number, imgIndex = 0) => products[i]?.image?.[imgIndex];


    return (
        <>
            <Head>
                <title>Nasywa ArtSpace</title>
                <meta name="description" content="Selamat datang di toko online kami!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <main className="flex flex-col gap-8 row-start-2 w-full max-w-screen-xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-100">
                {/* Sections */}
                <section className="relative  w-full h-[250px] sm:h-[350px] overflow-hidden text-center text-white rounded-[10px] bg-pink-500 bg-cover bg-center">
                    {/* Carousel Track */}
                    <div
                        className="flex w-full h-full transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {heroContents.map((content) => (
                            <div key={content.id} className="flex-shrink-0 w-full h-full overflow-hidden">
                                <img
                                    src={content.image}
                                    alt="Hero"
                                    className="w-full h-[300px] sm:w-full sm:h-full object-cover object-center rounded-[10px] block"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Hero Content */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center text-white">
                        <h1 className="text-base sm:text-2xl font-bold ">Temukan Produk Terbaik di Sini</h1>
                        <p className="text-base mt-2 sm:text-lg">Jelajahi koleksi terbaru kami sekarang juga!</p>
                        <a
                            href="/products"
                            className="inline-block text-base font-bold  mt-2 px-3 py-1.5 sm:mt-4 sm:px-6 sm:py-3 bg-pink-500 text-white rounded-md sm:font-bold transition hover:bg-pink-600"
                        >
                            Belanja Sekarang
                        </a>
                    </div>
                </section>

                <section className="mb-8 text-center text-pink-500 p-4 ">
                    <h2 className="text-2xl font-bold mb-6">Produk Unggulan</h2>
                    <div className="">
                        <div
                            className={`select-none cursor-grab flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 py-2 ${styles.scrollbarHide}`}
                            onMouseDown={(e) => {
                                const container = e.currentTarget;
                                container.style.cursor = 'grabbing';
                                const startX = e.pageX - container.offsetLeft;
                                const scrollLeft = container.scrollLeft;

                                const onMouseMove = (moveEvent: any) => {
                                    const x = moveEvent.pageX - container.offsetLeft;
                                    const walk = x - startX;
                                    container.scrollLeft = scrollLeft - walk;
                                };

                                const onMouseUp = () => {
                                    container.style.cursor = 'grab';
                                    window.removeEventListener('mousemove', onMouseMove);
                                    window.removeEventListener('mouseup', onMouseUp);
                                };

                                window.addEventListener('mousemove', onMouseMove);
                                window.addEventListener('mouseup', onMouseUp);
                            }}
                        >

                            {randomProducts.filter((product: productType) => product.affiliate && product.active)
                                .map((product) => (
                                    <div
                                        key={product.id}
                                        className="min-w-[250px] sm:min-w-[300px] md:min-w-[320px] text-center border border-gray-300 rounded-lg p-4 bg-white transition duration-300 ease-in-out hover:shadow-md hover:-translate-y-1"
                                    >
                                        <div className="relative w-full aspect-square mb-4">
                                            <Image
                                                src={product.image[0]}
                                                alt={product.name}
                                                fill
                                                draggable={false}
                                                className="w-full h-full object-cover rounded-lg pointer-events-none"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-2 p-2 border-t border-pink-300">
                                            <div className="text-left">
                                                <Link href={`/products/${product.id}`} passHref>

                                                    <h3 className="text-xs sm:text-[.7rem] md:text-[.9rem] font-bold text-pink-400 mb-1">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-xs sm:text-[.7rem] md:text-sm  font-semibold text-pink-400">
                                                        {new Intl.NumberFormat("id-ID", {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        }).format(product.price)}
                                                    </p>
                                                </Link>
                                            </div>
                                            <Link href={product.affiliate}>
                                                <button className="text-xs px-2.5 py-1 sm:text-[.7rem] sm:px-5 sm:py-2  md:text-[.9rem] md:px-5 md:py-2 xl:text-[1rem] border-pink-400 border-2 text-pink-400 rounded-md font-semibold hover:bg-pink-400 hover:text-white transition duration-300">
                                                    Beli Sekarang
                                                </button>
                                            </Link>

                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>

                <section className="shadow-lg text-center p-12 bg-pink-400 border-pink-400 border text-white rounded-lg mb-8 animate-fade-in">
                    <h2 className="text-2xl font-bold mb-4 ">Jangan Lewatkan Promo Spesial!</h2>
                    <p className="text-lg mb-6 ">Diskon hingga 50% untuk produk-produk pilihan.</p>
                    <a href="/products?promo=true" className="inline-block px-6 py-3 bg-pink-400 text-white border border-white rounded-md font-bold hover:bg-white hover:text-pink-400 transition">
                        Lihat Promo
                    </a>
                </section>

                <section className="text-center p-8 rounded-lg animate-fade-in shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-pink-500">Kenali Kami Lebih Dekat</h2>
                    <p className="leading-relaxed mb-6 text-pink-500">Kami menyediakan produk berkualitas tinggi dengan harga terjangkau untuk kebutuhan gaya hidup Anda.</p>
                    <a href="/about" className="inline-block px-6 py-3 bg-pink-400 text-white rounded-md font-bold hover:bg-pink-700 transition">
                        Baca Selengkapnya
                    </a>
                </section>
            </main >
        </>
    );
}
