import Link from 'next/link';
import styles from './Products.module.css';
type productType = {
    id: number,
    name: string,
    price: number,
    image: string,
    category: string
}
const Card = ({ products }: { products: productType[] }) => {


    return (
        <div className={styles.productLayout}>
            <h1 className={styles.pageTitle}>Koleksi Produk Kami</h1>
            <div className={styles.container}>
                {products.map((product: productType) =>
                (
                    <Link href={`/products/${product.id}`} className={styles.productCard} key={product.id}>
                        <div className={styles.imageWrapper}>
                            <img className={styles.productImage} src={product.image[0]}></img>
                        </div>
                        <div className={styles.productInfo}>
                            <h2 className={styles.productName}>{product.name}</h2>
                            <p className={styles.productPrice}>
                                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price)}
                            </p>
                        </div>
                        <button className={styles.buyButton}>Beli Sekarang</button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Card;