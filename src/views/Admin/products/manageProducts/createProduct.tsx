import style from './manageProduct.module.css';
import { useState } from 'react';
interface ManageContentsProps {
    onCancel: () => void;
}
export default function CreateProduct({ onCancel }: { onCancel: () => void }) {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        image: [] as File[],
        stock: 0,
        active: false,
        discount: 0,
        discount_status: false,
        description: '',
    });
    console.log(formData);
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
        const results = await fetch('/api/createProduct', {
            method: "POST",
            body: formData,
        });
        const data = await results.json();

        if (data.status) {
            event.target.reset();
            setIsSuccess(true);
            setIsLoading(false);
            window.location.reload();
            setTimeout(() => {

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
                    <h1>Create Product</h1>
                </div>

                <form id='formProduct' className={style.productForm} onSubmit={handleSubmit}>
                    <div className={style.gridTwoColumn}>
                        <label className={style.label}>
                            Nama Produk:
                            <input type="text" name="name" className={style.input} onChange={handleChange} />
                        </label>

                        <label className={style.label}>
                            SKU:
                            <input type="text" name="sku" className={style.input} onChange={handleChange} />
                        </label>
                        <label className={style.label}>
                            Status Product:
                            <select name="active" className={style.select} onChange={handleChange}>
                                <option value="true">Aktif</option>
                                <option value="false">Tidak Aktif</option>
                            </select>
                        </label>
                        <label className={style.label}>
                            Stok:
                            <input type="number" name="stock" className={style.input} onChange={handleChange} />
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
                            <input type="number" name="discount" className={style.input} onChange={handleChange} />
                        </label>
                        <label className={style.label}>
                            Harga :
                            <input type="number" name="price" className={style.input} onChange={handleChange} />
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
                            Link Product :
                            <input type="text" name="affiliate" className={style.input} onChange={handleChange} />
                        </label>
                        <label className={style.label}>
                            Deskripsi:
                            <textarea name="description" className={style.textarea} onChange={handleChange} />
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
        </div>
    )
}