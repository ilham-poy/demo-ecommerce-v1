import style from './manageProduct.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { del } from "@vercel/blob";
import { getDoc, doc, Firestore } from 'firebase/firestore';

type productType = {
    id: string;
    name: string;
    sku: string;
    image: string[];
    affiliate: string;
    stock: number;
    price: number;
    status: boolean | string;
    discount: number;
    discount_status: boolean;
    description: string;
}
interface ManageContentsProps {
    dataContent?: productType;
    onCancel: () => void;
}
export default function EditProduct({ dataContent, onCancel }: ManageContentsProps) {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        id: dataContent?.id,
        name: dataContent?.name,
        sku: dataContent?.sku,
        image: [] as File[],
        images: dataContent?.image,
        stock: dataContent?.stock,
        price: dataContent?.price,
        affiliate: dataContent?.affiliate,
        active: dataContent?.status,
        discount: dataContent?.discount,
        discount_status: dataContent?.discount_status,
        description: dataContent?.description,
    });


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        const combinedFiles = [...formData.image, ...newFiles];

        if (combinedFiles.length > 5) {
            alert("Maksimal 5 gambar saja.");
            e.target.value = ""; // reset input
            return;
        }

        // Optional: filter duplikat berdasarkan nama
        const uniqueFiles = Array.from(
            new Map(combinedFiles.map(file => [file.name, file])).values()
        );

        setFormData((prev) => ({
            ...prev,
            image: uniqueFiles,
        }));
    };
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        const parsedValue =
            type === "checkbox" && e.target instanceof HTMLInputElement
                ? e.target.checked
                : value === "true"
                    ? true
                    : value === "false"
                        ? false
                        : value;
        setFormData((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };


    const handleDelete = async (url: string, productId: string) => {


        try {
            const results = await fetch('/api/deleteImage', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: url, id: productId }),
            });

            const data = await results.json();
            if (data.status) {
                setIsSuccess(true);
                setIsLoading(false);
                setTimeout(() => {
                    window.location.reload();
                    setIsSuccess(false);
                }, 800);
            } else {
                setIsLoading(false);
                setError(results.status === 500 ? data.message : '')
            }

        } catch (error) {
            console.error("Error deleting image:", error);
        }

    }

    const handleCancel = () => {
        onCancel();
    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError('');
        setIsSuccess(false);
        setIsLoading(true);

        const formData = new FormData(event.target);

        // kirim formData langsung ke API
        const results = await fetch('/api/sendProductById', {
            method: "POST",
            body: formData,
        });
        const data = await results.json();

        if (data.status) {
            event.target.reset();
            setIsSuccess(true);
            setIsLoading(false);
            setTimeout(() => {
                window.location.reload();
                setIsSuccess(false);
            }, 800);
        } else {
            setIsLoading(false);
            setError(results.status === 500 ? data.message : '')
        }
    };
    return (
        <div>

            <div className={style.container}>
                <div className={style.header}>
                    <h1>Edit Product</h1>
                </div>

                {formData.images?.map((url, index) => (
                    <div className={style.imagePreviewContainer}>

                        <div className={style.imageContainer}>
                            <img
                                key={index}
                                src={url}
                                alt={`Gambar ${index + 1}`}
                                className={style.imagePreview}
                            />
                        </div>

                        <p>Gambar Product {index + 1}</p>
                        <button
                            type="button"
                            onClick={() => handleDelete(url, formData.id!)}
                            className={style.cancelButton}
                        >
                            Hapus Gambar
                        </button>

                    </div>
                ))}


                <form id='formProduct' className={style.productForm} onSubmit={handleSubmit}>
                    <div className={style.gridTwoColumn}>
                        <input type="hidden" name='id' value={formData.id} onChange={handleChange} />
                        <label className={style.label}>
                            Nama Produk:
                            <input type="text" name="name" value={formData.name} className={style.input} onChange={handleChange} />
                        </label>

                        <label className={style.label}>
                            SKU:
                            <input type="text" name="sku" value={formData.sku} className={style.input} onChange={handleChange} />
                        </label>
                        <label className={style.label}>
                            Status Product:
                            <select name="active" className={style.select} onChange={handleChange}>
                                <option value='true' >Aktif</option>
                                <option value="false">Tidak Aktif</option>
                            </select>
                        </label>
                        <label className={style.label}>
                            Stok:
                            <input type="number" name="stock" value={formData.stock} className={style.input} onChange={handleChange} />
                        </label>

                        <label className={style.label}>
                            Status Discount Product:
                            <select name="discount_status" className={style.select} onChange={handleChange}>
                                <option value="true">Aktif</option>
                                <option value="false">Tidak Aktif</option>
                            </select>
                        </label>

                        <label className={style.label}>
                            Diskon (%):
                            <input type="number" name="discount" value={formData.discount} className={style.input} onChange={handleChange} />
                        </label>
                        <label className={style.label}>
                            Harga :
                            <input type="number" name="price" value={formData.price} className={style.input} onChange={handleChange} />
                        </label>
                        <label className={style.label}>
                            Product Affiliate:
                            <select name="IsAffiliate" className={style.select} onChange={handleChange}>
                                <option value="true">Iya</option>
                                <option value="false">Tidak</option>
                            </select>
                        </label>



                        <div className={style.formGroup}>
                            <label htmlFor="image" className={style.label}>Upload Gambar
                                <div className={style.wrapper}>
                                    <label htmlFor="image" className={style.fileButton}>Pilih Gambar</label>
                                    <input
                                        name="image"
                                        type="file"
                                        id="image"
                                        multiple
                                        accept="image/*"
                                        className={style.hiddenInput}
                                        onChange={handleFileChange}
                                    />
                                    {formData.image.length > 0 && (
                                        <div className={style.fileNameList}>
                                            {formData.image.map((file, index) => (
                                                <span key={index} className={style.fileName}>
                                                    {file.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </label>


                        </div>

                    </div>

                    <div className={style.fullWidth}>
                        <label className={style.label}>
                            Link Affiliate :
                            <input type="text" name="affiliate" value={formData.affiliate} className={style.input} onChange={handleChange} />
                        </label>
                        <label className={style.label}>
                            Deskripsi:
                            <textarea name="description" value={formData.description} className={style.textarea} onChange={handleChange} />
                        </label>
                    </div>

                </form>
                <div className={style.buttonRow}>
                    <button type="submit" form='formProduct' className={style.submitButton}>
                        Simpan Produk
                    </button>
                    <button type="button" onClick={handleCancel} className={style.cancelButton}>
                        Batal
                    </button>
                </div>


            </div>
        </div >
    )
}