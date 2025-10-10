import style from './manageProduct.module.css';
import { useState } from 'react';
import LoadingSpinner from '@/views/loading';
import SuccessMessage from '@/views/loading/success';
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
        // <div>
        //     {isLoading && <LoadingSpinner />}
        //     {isSuccess && <SuccessMessage />}
        //     <div className={style.container}>
        //         <div className={style.header}>
        //             <h1>Create Product</h1>
        //         </div>

        //         <form id='formProduct' className={style.productForm} onSubmit={handleSubmit}>
        //             <div className={style.gridTwoColumn}>
        //                 <label className={style.label}>
        //                     Nama Produk:
        //                     <input type="text" name="name" className={style.input} onChange={handleChange} />
        //                 </label>

        //                 <label className={style.label}>
        //                     SKU:
        //                     <input type="text" name="sku" className={style.input} onChange={handleChange} />
        //                 </label>
        //                 <label className={style.label}>
        //                     Status Product:
        //                     <select name="active" className={style.select} onChange={handleChange}>
        //                         <option value="true">Aktif</option>
        //                         <option value="false">Tidak Aktif</option>
        //                     </select>
        //                 </label>
        //                 <label className={style.label}>
        //                     Stok:
        //                     <input type="number" name="stock" className={style.input} onChange={handleChange} />
        //                 </label>

        //                 <label className={style.label}>
        //                     Status Discount Product:
        //                     <select name="discount_status" className={style.select} onChange={handleChange}>
        //                         <option value="true">Aktif</option>
        //                         <option value="false">Tidak Aktif</option>
        //                     </select>
        //                 </label>

        //                 <label className={style.label}>
        //                     Diskon (%):
        //                     <input type="number" name="discount" className={style.input} onChange={handleChange} />
        //                 </label>
        //                 <label className={style.label}>
        //                     Harga :
        //                     <input type="number" name="price" className={style.input} onChange={handleChange} />
        //                 </label>

        //                 <label className={style.label}>
        //                     Product Affiliate:
        //                     <select name="IsAffiliate" className={style.select} onChange={handleChange}>
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
        //                     <input type="text" name="affiliate" className={style.input} onChange={handleChange} />
        //                 </label>
        //                 <label className={style.label}>
        //                     Deskripsi:
        //                     <textarea name="description" className={style.textarea} onChange={handleChange} />
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
        // </div>
        <div className="max-w-2xl m-6   xl:mx-auto mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
            {isLoading && <LoadingSpinner />}
            {isSuccess && <SuccessMessage />}

            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-black">Create Product</h1>
            </div>

            <form id="formProduct" onSubmit={handleSubmit} className=" text-sm sm:text-base flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nama Produk */}
                    <label className="flex flex-col font-medium text-gray-700">
                        Nama Produk:
                        <input type="text" name="name" onChange={handleChange}
                            className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
                    </label>

                    {/* SKU */}
                    <label className="flex flex-col font-medium text-gray-700">
                        SKU:
                        <input type="text" name="sku" onChange={handleChange}
                            className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
                    </label>

                    {/* Status Product */}
                    <label className="flex flex-col font-medium text-gray-700">
                        Status Product:
                        <select name="active" onChange={handleChange}
                            className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
                            <option value="true">Aktif</option>
                            <option value="false">Tidak Aktif</option>
                        </select>
                    </label>

                    {/* Stok */}
                    <label className="flex flex-col font-medium text-gray-700">
                        Stok:
                        <input type="number" name="stock" onChange={handleChange}
                            className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
                    </label>

                    {/* Status Diskon */}
                    <label className="flex flex-col font-medium text-gray-700">
                        Status Discount Product:
                        <select name="discount_status" onChange={handleChange}
                            className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
                            <option value="true">Aktif</option>
                            <option value="false">Tidak Aktif</option>
                        </select>
                    </label>

                    {/* Diskon */}
                    <label className="flex flex-col font-medium text-gray-700">
                        Diskon (%):
                        <input type="number" name="discount" onChange={handleChange}
                            className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
                    </label>

                    {/* Harga */}
                    <label className="flex flex-col font-medium text-gray-700">
                        Harga:
                        <input type="number" name="price" onChange={handleChange}
                            className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
                    </label>

                    {/* Affiliate */}
                    <label className="flex flex-col font-medium text-gray-700">
                        Product Affiliate:
                        <select name="IsAffiliate" onChange={handleChange}
                            className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
                            <option value="true">Iya</option>
                            <option value="false">Tidak</option>
                        </select>
                    </label>

                    {/* Upload Gambar */}
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
                </div>

                {/* Link & Deskripsi */}
                <div className="col-span-1 sm:col-span-2">
                    <label className="flex flex-col font-medium text-gray-700">
                        Link Product:
                        <input type="text" name="affiliate" onChange={handleChange}
                            className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-300" />
                    </label>

                    <label className="flex flex-col font-medium text-gray-700 mt-4">
                        Deskripsi:
                        <textarea name="description" onChange={handleChange}
                            className="mt-1 px-3 py-2 border border-green-500 rounded-md text-sm text-black bg-white min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-green-300" />
                    </label>
                </div>
            </form>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3 mt-6">
                <button type="submit" form="formProduct"
                    className="text-sm sm:text-base px-5 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 transition">
                    Simpan Produk
                </button>
                <button type="button" onClick={handleCancel}
                    className="text-sm sm:text-base px-5 py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 transition">
                    Batal
                </button>
            </div>
        </div>

    )
}