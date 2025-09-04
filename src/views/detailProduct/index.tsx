import styles from './DetailProduct.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from 'next/link';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
type productType = {
    id: number,
    name: string,
    price: number,
    image: string[],
    category: string,
    affiliate: string,
    description: string
}


const DetailProduct = ({ product }: { product: productType }) => {
    const [image, setImage] = useState(0);


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
    return (


        <div className={styles.productDetailContainer}>
            <div className={styles.productDetailWrapper}>
                <div className={styles.imageColumn}>
                    <div className={styles.imageContainer}>
                        <div className={styles.imageWrapper}>
                            <img className={styles.productImage} src={product.image?.[image]}></img>
                        </div>

                        {image !== 0 && (
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                onClick={() => handleLeft(image)}
                                className={`${styles.handleImage} ${styles.leftOverlay}`}
                            />
                        )}

                        {product.image?.length && image !== product.image.length - 1 && (
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                onClick={() => handleRight(image)}
                                className={`${styles.handleImage} ${styles.rightOverlay}`}
                            />
                        )}
                    </div>
                </div>

                <div className={styles.infoColumn}>
                    <h1 className={styles.productName}>{product.name}</h1>


                    <div className={styles.sellerInfo}>
                        <FontAwesomeIcon icon={faStore} className={styles.sellerIcon} />
                        <span className={styles.sellerName}></span>
                    </div>

                    <p className={styles.productPrice}>
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(product.price)}
                    </p>
                    <p className={styles.productDescription}>{product.description}</p>
                    {product.affiliate && (
                        <Link href={product.affiliate} className={styles.buyButton}>
                            Contact
                        </Link>
                    )}
                </div>
            </div>
        </div>

    )
}
export default DetailProduct;