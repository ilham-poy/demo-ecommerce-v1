import styles from './editContent.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

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
    const [isLoading, setIsLoading] = useState(true);
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
        <div className={styles.formContainer}>

            {/* <div className={styles.imagePreviewContainer}> */}
            {/* Tampilkan gambar hanya jika ada `imageLink` */}
            {/* {formData.image && ( */}
            {/* <img className={styles.imagePreview} src={formData.image} alt="Pratinjau Gambar" /> */}
            {/* )} */}
            {/* </div> */}
            {error &&
                <p className={styles.error}>{error}</p>
            }
            <h1>Create Content Slider</h1>
            <div className={styles.statusMessageContainer}>
                {isSuccess && <p className={styles.successMessage}>Data Berhasil Terkirim</p>}
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>

                <div className={styles.formGroup}>
                    <label htmlFor="backgroundName" >Nama Background</label>
                    <input
                        name='name'
                        type="text"
                        id="backgroundName"
                        className={styles.input}
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.wrapper}>
                        <label htmlFor="image" className={styles.fileButton}>Upload Gambar</label>
                        <input
                            name="image"
                            type="file"
                            id="image"
                            className={styles.hiddenInput}
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
                            <span className={styles.fileName}>
                                {formData.image.name}
                            </span>
                        )}
                    </div>
                </div>


                <div className={styles.formGroup}>
                    {/* Label untuk grup Radio */}
                    <span className={styles.label}>Status Aktif</span>
                    <div className={styles.radioGroup}>
                        {/* Opsi Radio "Aktif" */}
                        <label htmlFor="statusActiveTrue" className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="active"
                                id="statusActiveTrue"
                                value='true'
                                className={styles.radio}
                                onChange={handleChange}
                            />
                            Aktif
                        </label>

                        {/* Opsi Radio "Tidak Aktif" */}
                        <label htmlFor="statusActiveFalse" className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="active"
                                id="statusActiveFalse"
                                value="false"
                                className={styles.radio}
                                onChange={handleChange}
                            />
                            Tidak Aktif
                        </label>
                    </div>
                </div>

                <input type="hidden" name="hero-image" value="true" onChange={handleChange} />
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitButton}>
                        <FontAwesomeIcon icon={faSave} /> Simpan
                    </button>
                </div>
            </form>
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                <FontAwesomeIcon icon={faTimes} /> Batal
            </button>
        </div>
    );
}