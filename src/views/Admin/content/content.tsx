import styles from './Content.module.css'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EditContent from './manageContent/editContent';
import CreateContent from './manageContent/createContent';
import HomeViews from '@/views/Home';
type contentType = {
    id: string;
    name: string;
    image: string;
    active: boolean;
    "hero-image": boolean;
};
type deleteType = {
    id: string;
    image: string;
    active: boolean;

}
type Props = {
    status: string;
};
export default function ContentViews({ status }: Props) {
    const [contents, setContents] = useState([]);
    const [editingContentId, setEditingContentId] = useState('')
    const [deletedContentId, setDeletedContentId] = useState('')
    const [showCreate, setShowCreate] = useState(false);
    const [error, setError] = useState('');
    const { push } = useRouter();

    useEffect(() => {
        fetch('/api/contents')
            .then((res) => res.json())
            .then((response) => setContents(response.data));
    }, [])

    // !!! Core EDIT
    const handleEdit = (id: string) => {
        setEditingContentId(id);
    };
    const contentToEdit = contents.find((content: contentType) => content.id === editingContentId);
    if (editingContentId !== null && contentToEdit) {
        return (
            <EditContent
                dataContent={contentToEdit}
                onCancel={() => setEditingContentId('')}
            />
        );
    }


    const handleDelete = async (id: string) => {
        setDeletedContentId(id);
        const contentToDelete: deleteType | undefined = contents.find((content: contentType) => content.id === id);
        setError('')
        const data = {
            id: contentToDelete!.id,
            image: contentToDelete!.image,
            status: contentToDelete!.active,
        };

        const results = await fetch('/api/deleteContent', {
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

    const handleCreate = () => {
        setShowCreate(true); // ubah state, bukan return JSX
    };

    if (showCreate) {
        return (
            <CreateContent
                onCancel={() => setShowCreate(false)} // konsisten: onClose
            />
        );
    }



    return (
        <div className={styles.container}>
            <div className={styles.createButtonWrapper}>
                <button className={styles.createButton} onClick={() => handleCreate()}>
                    Create Content Slider
                </button>
            </div>
            <div className={styles.wrapper}>
                {contents.map((content: contentType) => (
                    // kalo disebelah kiri && bernilai true maka tampilkan yang ada disebelah kanan &&
                    content['hero-image'] && (
                        <div className={styles.card}>
                            <img className={styles.productImage} src={content.image} alt={content.name} />
                            <div className={styles.cardBody}>
                                <h1 className={styles.cardTitle}>{content.name}</h1>
                                <div className={`${styles.statusContainer} ${content.active ? styles.statusActive : styles.statusNonActive}`}>
                                    {content.active ? (
                                        <span > Konten Sedang Digunakan</span>
                                    ) : (
                                        <span>Konten Tidak Digunakan</span>
                                    )}
                                </div>
                                <div className={styles.cardActions}>
                                    <button className={styles.editButton} onClick={() => handleEdit(content.id)}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </button>

                                    <button className={styles.deleteButton} onClick={() => handleDelete(content.id)}>
                                        <FontAwesomeIcon icon={faTrash} /> Hapus
                                    </button>

                                </div>
                            </div >
                        </div >
                    )
                ))
                }
            </div>
        </div >
    )
}