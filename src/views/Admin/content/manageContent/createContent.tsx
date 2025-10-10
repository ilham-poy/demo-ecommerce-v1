import styles from './editContent.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/views/loading';
import SuccessMessage from '@/views/loading/success';
type contentType = {
    id: number;
    name: string;
    image: File;
    active: boolean;
    "hero-image": boolean;
};

interface ManageContentsProps {
    onCancel: () => void;
}

export default function CreateContent({ onCancel }: { onCancel: () => void }) {
    //!!! cara pertama dapet data dari form
    const [formData, setFormData] = useState({
        name: '',
        image: null as File | null,
        active: false,
        'hero-image': '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const { push } = useRouter();
    const handleCancel = () => {
        onCancel();
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value === "true"   // kalau string "true"
                    ? true
                    : value === "false" // kalau string "false"
                        ? false
                        : value, // sisanya biarin string/number
        }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError('');
        setIsSuccess(false);
        setIsLoading(true);

        const formData = new FormData(event.target);

        // kirim formData langsung ke API
        const results = await fetch('/api/createContent', {
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
        // <div className={styles.formContainer}>
        //     {isLoading && <LoadingSpinner />}
        //     {error &&
        //         <p className={styles.error}>{error}</p>
        //     }
        //     {isSuccess && <SuccessMessage />}
        //     <h1 className='text-2xl font-semibold'>Create Content Slider</h1>
        //     <form className={styles.form} onSubmit={handleSubmit}>

        //         <div className={styles.formGroup}>
        //             <label htmlFor="backgroundName" >Nama Background</label>
        //             <input
        //                 name='name'
        //                 type="text"
        //                 id="backgroundName"
        //                 className={styles.input}
        //                 value={formData.name}
        //                 onChange={handleChange}
        //             />
        //         </div>

        //         <div className={styles.formGroup}>
        //             <div className={styles.wrapper}>
        //                 <label htmlFor="image" className={styles.fileButton}>Upload Gambar</label>
        //                 <input
        //                     name="image"
        //                     type="file"
        //                     id="image"
        //                     className={styles.hiddenInput}
        //                     onChange={(e) => {
        //                         const file = e.target?.files?.[0];
        //                         if (!file) return;
        //                         setFormData((prev) => ({
        //                             ...prev,
        //                             image: file,
        //                         }));
        //                     }}
        //                 />
        //                 {formData.image && (
        //                     <span className={styles.fileName}>
        //                         {formData.image.name}
        //                     </span>
        //                 )}
        //             </div>
        //         </div>


        //         <div className={styles.formGroup}>
        //             {/* Label untuk grup Radio */}
        //             <span className={styles.label}>Status Aktif</span>
        //             <div className={styles.radioGroup}>
        //                 {/* Opsi Radio "Aktif" */}
        //                 <label htmlFor="statusActiveTrue" className={styles.radioLabel}>
        //                     <input
        //                         type="radio"
        //                         name="active"
        //                         id="statusActiveTrue"
        //                         value='true'
        //                         className={styles.radio}
        //                         onChange={handleChange}
        //                     />
        //                     Aktif
        //                 </label>

        //                 {/* Opsi Radio "Tidak Aktif" */}
        //                 <label htmlFor="statusActiveFalse" className={styles.radioLabel}>
        //                     <input
        //                         type="radio"
        //                         name="active"
        //                         id="statusActiveFalse"
        //                         value="false"
        //                         className={styles.radio}
        //                         onChange={handleChange}
        //                     />
        //                     Tidak Aktif
        //                 </label>
        //             </div>
        //         </div>

        //         <input type="hidden" name="hero-image" value="true" onChange={handleChange} />
        //         <div className={styles.buttonGroup}>
        //             <button type="submit" className={styles.submitButton}>
        //                 <FontAwesomeIcon icon={faSave} /> Simpan
        //             </button>
        //         </div>
        //     </form>
        //     <button type="button" onClick={handleCancel} className={styles.cancelButton}>
        //         <FontAwesomeIcon icon={faTimes} /> Batal
        //     </button>
        // </div>
        <div className="max-w-xl m-6 sm:mx-auto p-4 sm:p-8 bg-white rounded-lg shadow-md">
            {/* Status Message */}
            {isLoading && (
                <LoadingSpinner />
            )}
            {error && (
                <p className="text-red-600 font-medium mb-4 text-center">{error}</p>
            )}
            {isSuccess && (
                <SuccessMessage />
            )}

            <h1 className="text-xl sm:text-2xl font-bold mb-6">Create Content Slider</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Nama Background */}
                <div>
                    <label htmlFor="backgroundName" className="block font-medium mb-2 text-base sm:text-xl">Nama Background</label>
                    <input
                        name="name"
                        type="text"
                        id="backgroundName"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-green-500 rounded-md text-black bg-white hover:shadow-md hover:shadow-green-300 focus:outline-none"
                    />
                </div>

                {/* Upload Gambar */}
                <div>
                    <div className="flex items-center justify-between w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-300 ">
                        <label htmlFor="image" className="text-xs sm:text-base flex-none w-1/3 bg-green-500 text-white font-bold text-center py-3 cursor-pointer">
                            Upload Gambar
                        </label>
                        <input
                            name="image"
                            type="file"
                            id="image"
                            className="sr-only  "
                            onChange={(e) => {
                                const file = e.target?.files?.[0];
                                if (!file) return;
                                setFormData((prev) => ({
                                    ...prev,
                                    image: file,
                                }));
                            }}
                        />
                        {formData.image && (
                            <span className="flex-1 italic text-black bg-white px-4 py-2 truncate">
                                {formData.image.name}
                            </span>
                        )}
                    </div>
                </div>

                {/* Preview Gambar */}
                {formData.image && (
                    <div className="w-full h-48 bg-gray-100 border border-dashed border-gray-400 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
                        <img src={URL.createObjectURL(formData.image)} alt="Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                )}

                {/* Status Aktif */}
                <div>
                    <span className="block font-bold mb-2">Status Aktif</span>
                    <div className="flex gap-6 mt-1">
                        <label htmlFor="statusActiveTrue" className="flex items-center text-gray-800 cursor-pointer">
                            <input
                                type="radio"
                                name="active"
                                id="statusActiveTrue"
                                value="true"
                                onChange={handleChange}
                                className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full mr-2 checked:border-green-500 checked:bg-green-600"
                            />
                            Aktif
                        </label>
                        <label htmlFor="statusActiveFalse" className="flex items-center text-gray-800 cursor-pointer">
                            <input
                                type="radio"
                                name="active"
                                id="statusActiveFalse"
                                value="false"
                                onChange={handleChange}
                                className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full mr-2 checked:border-green-500 checked:bg-green-600"
                            />
                            Tidak Aktif
                        </label>
                    </div>
                </div>

                {/* Hidden Hero Image */}
                <input type="hidden" name="hero-image" value="true" onChange={handleChange} />

                {/* Tombol Simpan */}
                <div className="flex gap-4 mt-6">
                    <button type="submit" className="text-sm sm:text-base flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 w-full">
                        <FontAwesomeIcon icon={faSave} /> Simpan
                    </button>
                </div>
            </form>

            {/* Tombol Batal */}
            <button type="button" onClick={handleCancel} className="text-sm sm:text-base flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 w-full mt-4">
                <FontAwesomeIcon icon={faTimes} /> Batal
            </button>
        </div>

    );
}