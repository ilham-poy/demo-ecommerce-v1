import { useState, useEffect } from 'react';
import styles from './Product.module.css';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import EditProduct from './manageProducts/editProduct';
import CreateProduct from './manageProducts/createProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingSpinner from '@/views/loading';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
type productType = {
    id: string;
    name: string;
    sku: string;
    image: string[];
    stock: number;
    active: boolean;
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
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);

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
            setIsLoading(false);

            window.location.reload();

        } else {
            setError(results.status === 400 ? 'Email Already Exists' : '')
        }
    };


    return (
        // <div className={styles.container}>
        //     <div className={styles.createButtonWrapper}>
        //         <button className={styles.createButton} onClick={() => handleCreate()}>
        //             Create Product
        //         </button>
        //     </div>

        //     <div className={styles.grid}>
        //         {products.map((product: productType) => (
        //             <div className={styles.card}>
        //                 {/* Opsional Carousel */}
        //                 {/* {product.image.map((imag: string) => (
        //                     <img src={imag} alt="" />
        //                 ))} */}
        //                 <img src={product.image[0]} className={styles.image} alt="" />
        //                 <div className={styles.infoRow}>
        //                     <span className={styles.label}>Nama Product</span>
        //                     <span className={styles.separator}>:</span>
        //                     <span className={styles.value}>{product.name}</span>
        //                 </div>
        //                 <div className={styles.infoRow}>
        //                     <span className={styles.label}>SKU</span>
        //                     <span className={styles.separator}>:</span>
        //                     <span className={styles.value}>{product.sku}</span>
        //                 </div>
        //                 <div className={styles.infoRow}>
        //                     <span className={styles.label}>Status</span>
        //                     <span className={styles.separator}>:</span>
        //                     <span className={styles.value}>
        //                         {product.status ? 'Ditampilkan' : 'Tidak Ditampilkan'}
        //                     </span>
        //                 </div>
        //                 <div className={styles.infoRow}>
        //                     <span className={styles.label}>Stock</span>
        //                     <span className={styles.separator}>:</span>
        //                     <span className={styles.value}>{product.stock}</span>
        //                 </div>
        //                 <div className={styles.infoRow}>
        //                     <span className={styles.label}>Discount</span>
        //                     <span className={styles.separator}>:</span>
        //                     <span className={styles.value}>
        //                         {product.discount_status ? `${product.discount}%` : 'None'}
        //                     </span>
        //                 </div>
        //                 <hr />
        //                 <div className={styles.infoRow}>
        //                     <span className={styles.label}>Deskripsi</span>
        //                 </div>
        //                 <div className={styles.descriptionValue}>
        //                     {product.description.slice(0, 75)}{product.description.length > 30 ? '...' : ''}
        //                 </div>
        //                 <div className={styles.cardActions}>
        //                     <button className={styles.editButton} onClick={() => { handleEdit(product.id) }}>
        //                         <FontAwesomeIcon icon={faEdit} /> Edit
        //                     </button>

        //                     <button className={styles.deleteButton} onClick={() => handleDelete(product.id)}>
        //                         <FontAwesomeIcon icon={faTrash} /> Hapus
        //                     </button>
        //                 </div>
        //             </div>
        //         ))}

        //     </div>
        // </div>

        <>
            {isLoading && <LoadingSpinner />}
            <div className="flex flex-col flex-wrap  box-border">
                <div className="flex justify-start mx-2 py-4 sm:p-4 box-border">
                    <button
                        className="px-5 p-2 text-xs bg-pink-400 hover:bg-pink-600 text-white font-bold rounded transition-colors duration-300"
                        onClick={() => handleCreate()}
                    >
                        Create Product
                    </button>
                </div>

                <div className="grid py-4 sm:p-4 gap-6 mx-2 grid-cols-[repeat(260px,minmax(17rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] auto-rows-[minmax(450px,580px)] text-xs sm:text-sm  box-border">
                    {products.map((product: productType) => (
                        <div className="bg-white border text-xs border-gray-200  w-[270px] sm:w-full rounded-lg p-4 shadow-sm h-fit box-border">
                            <img
                                src={product.image[0]}
                                alt=""
                                className="w-full h-[180px] object-cover rounded mb-3"
                            />

                            {/* Info Rows */}
                            <div className="grid grid-cols-[140px_10px_1fr] gap-2 py-1 items-start">
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">Nama Product</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">:</span>
                                <span className="text-xs sm:text-sm text-gray-600 break-words">{product.name}</span>
                            </div>
                            {/* <div className="grid grid-cols-[140px_10px_1fr] gap-2 py-1 items-start">
                                <span className="font-semibold text-gray-800">SKU</span>
                                <span className="font-semibold text-gray-800">:</span>
                                <span className="text-gray-600 break-words">{product.sku}</span>
                            </div> */}
                            <div className="grid grid-cols-[140px_10px_1fr] gap-2 py-1 items-start">
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">Status Product</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">:</span>
                                <span className="text-xs sm:text-sm text-gray-600">
                                    {product.active ? 'Ditampilkan' : 'Tidak Ditampilkan'}
                                </span>
                            </div>
                            <div className="grid grid-cols-[140px_10px_1fr] gap-2 py-1 items-start">
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">Stock</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">:</span>
                                <span className="text-xs sm:text-sm text-gray-600">{product.stock}</span>
                            </div>
                            <div className="grid grid-cols-[140px_10px_1fr] gap-2 py-1 items-start">
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">Discount Status</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">:</span>
                                <span className="text-xs sm:text-sm text-gray-600">
                                    {product.discount_status ? `Aktif` : 'Tidak Aktif'}
                                </span>
                            </div>
                            <div className="grid grid-cols-[140px_10px_1fr] gap-2 py-1 items-start">
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">Discount</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">:</span>
                                <span className="text-xs sm:text-sm text-gray-600">
                                    {product.discount ? product.discount : 'Tidak Ada Discount'}
                                </span>
                            </div>
                            <div className="grid grid-cols-[140px_10px_1fr] gap-2 py-1 items-start">
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">Price Without Discount </span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">:</span>
                                <span className="text-xs sm:text-sm text-gray-600">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(product.price)}
                                </span>
                            </div>

                            <hr className="my-3" />

                            <div className="grid grid-cols-[140px_10px_1fr] gap-2 py-1 items-start">
                                <span className="font-semibold text-gray-800">Deskripsi</span>
                            </div>
                            <div className="text-gray-600 text-sm">
                                {product.description.slice(0, 75)}
                                {product.description.length > 30 ? '...' : ''}
                            </div>

                            {/* Actions */}
                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    className="px-4 py-2 bg-[#2ecc71] hover:bg-green-700 text-white text-sm rounded flex items-center gap-2"
                                    onClick={() => handleEdit(product.id)}
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white text-sm rounded flex items-center gap-2"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} /> Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>





    );


}