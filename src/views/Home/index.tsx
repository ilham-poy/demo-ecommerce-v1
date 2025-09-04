import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from './Home.module.css';
import { useEffect, useState } from "react";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


type contentType = {
    id: string;
    name: string;
    image: string;
    active: boolean;
    "hero-image": boolean;
};

export default function HomeViews({ contents }: { contents: contentType[] }) {

    const heroContents = contents.filter((c) => c["hero-image"]);

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
    return (
        <>
            <Head>
                <title>Toko Online Sederhana</title>
                <meta name="description" content="Selamat datang di toko online kami!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <main className={styles.main}>
                <section className={styles.heroSection}>
                    <div
                        className={styles.carouselTrack}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {contents.filter((content) => content["hero-image"] && content.active === true).map((content) => (

                            <img
                                key={content.id}
                                className={styles.heroImage}
                                src={content.image}
                                alt="Latar Belakang Hero"
                            />
                        ))}
                    </div>

                    <div className={styles.heroContent}>
                        <h1>Temukan Produk Terbaik di Sini</h1>
                        <p>Jelajahi koleksi terbaru kami sekarang juga!</p>
                        <a href="/products" className={styles.ctaButton}>
                            Belanja Sekarang
                        </a>
                    </div>
                </section>

                <section className={styles.featuredSection}>
                    <h2>Produk Unggulan</h2>
                    <div className={styles.productGrid}>
                        <div className={styles.productCard}>
                            <Image src="/product-1.jpg" alt="Produk 1" width={250} height={250} />
                            <h3>Tas Ransel Elegan</h3>
                            <p>Rp 350.000</p>
                        </div>
                        <div className={styles.productCard}>
                            <Image src="/product-2.jpg" alt="Produk 2" width={250} height={250} />
                            <h3>Sepatu Lari Sport</h3>
                            <p>Rp 600.000</p>
                        </div>
                        <div className={styles.productCard}>
                            <Image src="/product-3.jpg" alt="Produk 3" width={250} height={250} />
                            <h3>Kemeja Flanel Casual</h3>
                            <p>Rp 220.000</p>
                        </div>
                    </div>
                </section>

                <section className={styles.promoSection}>
                    <h2>Jangan Lewatkan Promo Spesial!</h2>
                    <p>Diskon hingga 50% untuk produk-produk pilihan.</p>
                    <a href="/products" className={styles.ctaButton}>Lihat Promo</a>
                </section>

                <section className={styles.aboutSection}>
                    <h2>Kenali Kami Lebih Dekat</h2>
                    <p>Kami menyediakan produk berkualitas tinggi dengan harga terjangkau untuk kebutuhan gaya hidup Anda.</p>
                    <a href="/contact" className={styles.ctaButton}>Baca Selengkapnya</a>
                </section>

            </main>

        </>
    );
}
