import styles from './Content.module.css'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EditContent from './manageContent/editContent';
import CreateContent from './manageContent/createContent';
import LoadingSpinner from '@/views/loading';
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
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
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
            setIsLoading(true);
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
        <>
            {isLoading && <LoadingSpinner />}
            <div className="flex flex-col flex-wrap mx-2 box-border">

                <div className="flex justify-start py-4 sm:p-4 box-border">
                    <button
                        className="px-5 py-2 text-xs bg-pink-400 hover:bg-pink-600  text-white font-bold rounded transition-colors duration-300"
                        onClick={() => handleCreate()}
                    >
                        Create Content Slider
                    </button>
                </div>

                <div className="grid  py-4  sm:p-4  grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]  auto-rows-[minmax(300px,400px)]  gap-x-6  ">
                    {contents.map((content: contentType) =>
                        content['hero-image'] && (
                            <div className="bg-white rounded-lg shadow-md m-2 overflow-hidden w-[250px] sm:w-[300px] flex flex-col h-fit">
                                <img
                                    className="w-full h-[200px] object-cover"
                                    src={content.image}
                                    alt={content.name}
                                />
                                <div className="p-4 flex flex-col ">
                                    <h1 className="text-xl font-semibold text-gray-800 mb-2">{content.name}</h1>

                                    <div
                                        className={`inline-block font-bold text-sm mb-2 rounded-full ${content.active ? 'text-red-500' : 'text-black'
                                            }`}
                                    >
                                        {content.active ? (
                                            <span>Konten Sedang Digunakan</span>
                                        ) : (
                                            <span>Konten Tidak Digunakan</span>
                                        )}
                                    </div>

                                    <div className="mt-2 flex justify-between items-center">
                                        <button
                                            className="px-3 py-2 bg-green-500 hover:bg-green-700 text-white text-sm rounded flex items-center gap-1"
                                            onClick={() => handleEdit(content.id)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                        </button>

                                        <button
                                            className="px-3 py-2 bg-red-500 hover:bg-red-700 text-white text-sm rounded flex items-center gap-1"
                                            onClick={() => handleDelete(content.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>


    )
}