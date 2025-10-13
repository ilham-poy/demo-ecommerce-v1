import style from './manageProduct.module.css';
import { useState } from 'react';
import LoadingSpinner from '@/views/loading';
import SuccessMessage from '@/views/loading/success';
type productType = {
    id: string;
    name: string;
    sku: string;
    image: string[];
    affiliate: string;
    stock: number;
    price: number;
    IsAffiliate: boolean | string;
    active: boolean | string;
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
        IsAffiliate: dataContent?.IsAffiliate,
        affiliate: dataContent?.affiliate,
        active: dataContent?.active,
        discount: dataContent?.discount,
        discount_status: dataContent?.discount_status,
        description: dataContent?.description,
    });


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        const combinedFiles = [...formData.image, ...newFiles];

        if (combinedFiles.length > 1) {
            alert("Maksimal 1 gambar saja.");
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
        setIsLoading(true);
        setIsSuccess(false);


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

                setIsSuccess(false);
            }, 800);
        } else {
            setIsLoading(false);
            setError(results.status === 500 ? data.message : '')
        }
    };
    return (
        // <div>
        //     {isLoading && <LoadingSpinner />}
        //     {isSuccess && <SuccessMessage />}

        //     <div className={style.container}>
        //         <div className={style.header}>
        //             <h1>Edit Product</h1>
        //         </div>

        //         {formData.images?.map((url, index) => (
        //             <div className={style.imagePreviewContainer}>

        //                 <div className={style.imageContainer}>
        //                     <img
        //                         key={index}
        //                         src={url}
        //                         alt={`Gambar ${index + 1}`}
        //                         className={style.imagePreview}
        //                     />
        //                 </div>

        //                 <p>Gambar Product {index + 1}</p>
        //                 <button
        //                     type="button"
        //                     onClick={() => handleDelete(url, formData.id!)}
        //                     className={style.cancelButton}
        //                 >
        //                     Hapus Gambar
        //                 </button>

        //             </div>
        //         ))}


        //         <form id='formProduct' className={style.productForm} onSubmit={handleSubmit}>
        //             <div className={style.gridTwoColumn}>
        //                 <input type="hidden" name='id' value={formData.id} onChange={handleChange} />
        //                 <label className={style.label}>
        //                     Nama Produk:
        //                     <input type="text" name="name" value={formData.name} className={style.input} onChange={handleChange} />
        //                 </label>

        //                 <label className={style.label}>
        //                     SKU:
        //                     <input type="text" name="sku" value={formData.sku} className={style.input} onChange={handleChange} />
        //                 </label>
        //                 <label className={style.label}>
        //                     Status Product:
        //                     <select name="active" value={String(formData.active)} className={style.select} onChange={handleChange}>
        //                         <option value='true' >Aktif</option>
        //                         <option value="false">Tidak Aktif</option>
        //                     </select>
        //                 </label>
        //                 <label className={style.label}>
        //                     Stok:
        //                     <input type="number" name="stock" value={formData.stock} className={style.input} onChange={handleChange} />
        //                 </label>

        //                 <label className={style.label}>
        //                     Status Discount Product:
        //                     <select name="discount_status" value={String(formData.discount_status)}
        //                         className={style.select} onChange={handleChange}>
        //                         <option value="true">Aktif</option>
        //                         <option value="false">Tidak Aktif</option>
        //                     </select>
        //                 </label>

        //                 <label className={style.label}>
        //                     Diskon (%):
        //                     <input type="number" name="discount" value={formData.discount} className={style.input} onChange={handleChange} />
        //                 </label>
        //                 <label className={style.label}>
        //                     Harga :
        //                     <input type="number" name="price" value={formData.price} className={style.input} onChange={handleChange} />
        //                 </label>
        //                 <label className={style.label}>
        //                     Product Affiliate:
        //                     <select name="IsAffiliate" value={String(formData.IsAffiliate)} className={style.select} onChange={handleChange}>
        //                         <option value="true">Iya</option>
        //                         <option value="false">Tidak</option>
        //                     </select>
        //                 </label>



        //                 <div className={style.formGroup}>
        //                     <label htmlFor="image" className={style.label}>Upload Gambar
        //                         <div className={style.wrapper}>
        //                             <label htmlFor="image" className={style.fileButton}>Pilih Gambar</label>
        //                             <input
        //                                 name="image"
        //                                 type="file"
        //                                 id="image"
        //                                 multiple
        //                                 accept="image/*"
        //                                 className={style.hiddenInput}
        //                                 onChange={handleFileChange}
        //                             />
        //                             {formData.image.length > 0 && (
        //                                 <div className={style.fileNameList}>
        //                                     {formData.image.map((file, index) => (
        //                                         <span key={index} className={style.fileName}>
        //                                             {file.name}
        //                                         </span>
        //                                     ))}
        //                                 </div>
        //                             )}
        //                         </div>
        //                     </label>


        //                 </div>

        //             </div>

        //             <div className={style.fullWidth}>
        //                 <label className={style.label}>
        //                     Link Product :
        //                     <input type="text" name="affiliate" value={formData.affiliate} className={style.input} onChange={handleChange} />
        //                 </label>
        //                 <label className={style.label}>
        //                     Deskripsi:
        //                     <textarea name="description" value={formData.description} className={style.textarea} onChange={handleChange} />
        //                 </label>
        //             </div>

        //         </form>
        //         <div className={style.buttonRow}>
        //             <button type="submit" form='formProduct' className={style.submitButton}>
        //                 Simpan Produk
        //             </button>
        //             <button type="button" onClick={handleCancel} className={style.cancelButton}>
        //                 Batal
        //             </button>
        //         </div>


        //     </div>
        // </div >
        <div className="max-w-2xl m-6   xl:mx-auto  mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
            {isLoading && <LoadingSpinner />}
            {isSuccess && <SuccessMessage />}

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-black">Edit Product</h1>
            </div>

            {/* Preview Gambar Lama */}
            {formData.images?.map((url, index) => (
                <div key={index} className="flex flex-col items-center mb-6 rounded-lg">
                    <div className="w-full h-52 bg-gray-100 rounded-lg flex items-center justify-center mb-2 p-2">
                        <img src={url} alt={`Gambar ${index + 1}`} className="w-full h-full object-contain rounded-md" />
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Gambar Product {index + 1}</p>
                    <button
                        type="button"
                        onClick={() => handleDelete(url, formData.id!)}
                        className="text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 transition"
                    >
                        Hapus Gambar
                    </button>
                </div>
            ))}

            {/* Form */}
            <form id="formProduct" onSubmit={handleSubmit} className="grid grid-cols-1 text-sm sm:text-base sm:grid-cols-2 gap-5">
                <input type="hidden" name="id" value={formData.id} onChange={handleChange} />

                {/* Nama Produk */}
                <label className="flex flex-col font-medium text-gray-700">
                    Nama Produk:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </label>

                {/* SKU */}
                <label className="flex flex-col font-medium text-gray-700">
                    SKU:
                    <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </label>

                {/* Status Product */}
                <label className="flex flex-col font-medium text-gray-700">
                    Status Product:
                    <select
                        name="active"
                        value={String(formData.active)}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        <option value="true">Aktif</option>
                        <option value="false">Tidak Aktif</option>
                    </select>
                </label>

                {/* Stok */}
                <label className="flex flex-col font-medium text-gray-700">
                    Stok:
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </label>

                {/* Status Diskon */}
                <label className="flex flex-col font-medium text-gray-700">
                    Status Discount Product:
                    <select
                        name="discount_status"
                        value={String(formData.discount_status)}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        <option value="true">Aktif</option>
                        <option value="false">Tidak Aktif</option>
                    </select>
                </label>

                {/* Diskon */}
                <label className="flex flex-col font-medium text-gray-700">
                    Diskon (%):
                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </label>

                {/* Harga */}
                <label className="flex flex-col font-medium text-gray-700">
                    Harga:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </label>

                {/* Affiliate */}
                <label className="flex flex-col font-medium text-gray-700">
                    Product Affiliate:
                    <select
                        name="IsAffiliate"
                        value={String(formData.IsAffiliate)}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        <option value="true">Iya</option>
                        <option value="false">Tidak</option>
                    </select>
                </label>

                {/* Upload Gambar */}
                {/* <div className="col-span-1 sm:col-span-2">
                    <label htmlFor="image" className="flex flex-col font-medium text-gray-700">
                        Upload Gambar:
                        <div className="flex items-center justify-between border border-green-500 rounded-md mt-2 hover:shadow-md hover:shadow-green-300">
                            <label htmlFor="image" className="w-2/5 bg-green-500 text-white text-center py-2 font-bold cursor-pointer">
                                Pilih Gambar
                            </label>
                            <input
                                name="image"
                                type="file"
                                id="image"
                                multiple
                                accept="image/*"
                                className="sr-only"
                                onChange={handleFileChange}
                            />
                            {formData.image.length > 0 && (
                                <div className="flex flex-col gap-1 px-3 py-2">
                                    {formData.image.map((file, index) => (
                                        <span key={index} className="text-sm italic text-gray-800 bg-gray-100 px-2 py-1 rounded-md truncate">
                                            {file.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </label>
                </div> */}
                <div className="sm:col-span-2">
                    <label htmlFor="image" className="flex flex-col font-medium text-gray-700">
                        Upload Gambar:
                        <div className="flex items-center justify-between border border-green-500 rounded-md mt-2 hover:shadow-md hover:shadow-green-300">
                            <label htmlFor="image" className="w-2/5 bg-green-500 text-white text-center py-2 font-bold cursor-pointer">
                                Pilih Gambar
                            </label>
                            <input
                                name="image"
                                type="file"
                                id="image"
                                multiple
                                accept="image/*"
                                className="sr-only"
                                onChange={handleFileChange}
                            />
                            {formData.image.length > 0 && (
                                <div className="flex flex-col gap-1 px-3 py-2">
                                    {formData.image.map((file, index) => (
                                        <span key={index} className="text-sm italic text-gray-800 bg-gray-100 px-2 py-1 rounded-md truncate">
                                            {file.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </label>
                </div>

                {/* Link Product */}
                <label className="col-span-1 sm:col-span-2 flex flex-col font-medium text-gray-700">
                    Link Product:
                    <input
                        type="text"
                        name="affiliate"
                        value={formData.affiliate}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </label>

                {/* Deskripsi */}
                <label className="col-span-1 sm:col-span-2 flex flex-col font-medium text-gray-700">
                    Deskripsi:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </label>
            </form>


            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="submit"
                    form="formProduct"
                    className="text-sm sm:text-base px-5 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 transition"
                >
                    Simpan Produk
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="text-sm sm:text-base px-5 py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 transition"
                >
                    Batal
                </button>
            </div>
        </div>

    )
}