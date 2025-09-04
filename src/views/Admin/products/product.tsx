import { useState, useEffect } from 'react';
import styles from './Product.module.css';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import EditProduct from './manageProducts/editProduct';
import CreateProduct from './manageProducts/createProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
type productType = {
    id: string;
    name: string;
    sku: string;
    image: string[];
    stock: number;
    status: boolean;
    price: number;
    discount: number;
    discount_status: boolean;
    description: string;
}
type deleteType = {
    id: string;
    image: string;
    active: boolean;

}


export default function AdminProductsViews() {
    const [showCreate, setShowCreate] = useState(false);
    const [products, setProducts] = useState([]);
    const [editingContentId, setEditingContentId] = useState('');
    const [deletedProductId, setDeletedProductId] = useState('');
    const [error, setError] = useState('');
    const { push } = useRouter();

    // const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});


    const handleCreate = () => {
        setShowCreate(true)
    }
    useEffect(() => {
        fetch('/api/products/product')
            .then((res) => res.json())
            .then((response) => setProducts(response.data));
    }, [])

    if (showCreate) {
        return (<CreateProduct
            onCancel={() => setShowCreate(false)} />)
    }

    const handleEdit = (id: string) => {
        setEditingContentId(id);
    };
    const productToEdit = products.find((product: productType) => product.id === editingContentId);
    if (editingContentId !== null && productToEdit) {
        return (
            <EditProduct
                dataContent={productToEdit}
                onCancel={() => setEditingContentId('')}
            />
        );
    }

    // const handleImageClick = (sku: string, images: string[], direction: 'next' | 'prev') => {
    //     setImageIndexes((prev) => {
    //         const currentIndex = prev[name] ?? 0;
    //         const total = images.length;
    //         const nextIndex =
    //             direction === 'next'
    //                 ? (currentIndex + 1) % total
    //                 : (currentIndex - 1 + total) % total;
    //         return { ...prev, [sku]: nextIndex };
    //     });
    // };

    const handleDelete = async (id: string) => {
        setDeletedProductId(id);
        setError('');
        const contentToDelete: deleteType | undefined = products.find((product: productType) => product.id === id);
        const data = {
            id: contentToDelete!.id,
        };

        const results = await fetch('/api/deleteProduct', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        if (results.status === 200) {
            setTimeout(() => {
                push('/admin')
            }, 800);
            window.location.reload();

        } else {
            setError(results.status === 400 ? 'Email Already Exists' : '')
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.createButtonWrapper}>
                <button className={styles.createButton} onClick={() => handleCreate()}>
                    Create Product
                </button>
            </div>

            <div className={styles.grid}>
                {products.map((product: productType) => (
                    <div className={styles.card}>
                        {/* Opsional Carousel */}
                        {/* {product.image.map((imag: string) => (
                            <img src={imag} alt="" />
                        ))} */}
                        <img src={product.image[0]} className={styles.image} alt="" />
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Nama Product</span>
                            <span className={styles.separator}>:</span>
                            <span className={styles.value}>{product.name}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>SKU</span>
                            <span className={styles.separator}>:</span>
                            <span className={styles.value}>{product.sku}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Status</span>
                            <span className={styles.separator}>:</span>
                            <span className={styles.value}>
                                {product.status ? 'Ditampilkan' : 'Tidak Ditampilkan'}
                            </span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Stock</span>
                            <span className={styles.separator}>:</span>
                            <span className={styles.value}>{product.stock}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Discount</span>
                            <span className={styles.separator}>:</span>
                            <span className={styles.value}>
                                {product.discount_status ? `${product.discount}%` : 'None'}
                            </span>
                        </div>
                        <hr />
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Deskripsi</span>
                        </div>
                        <div className={styles.descriptionValue}>
                            {product.description.slice(0, 75)}{product.description.length > 30 ? '...' : ''}
                        </div>
                        <div className={styles.cardActions}>
                            <button className={styles.editButton} onClick={() => { handleEdit(product.id) }}>
                                <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>

                            <button className={styles.deleteButton} onClick={() => handleDelete(product.id)}>
                                <FontAwesomeIcon icon={faTrash} /> Hapus
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );


}