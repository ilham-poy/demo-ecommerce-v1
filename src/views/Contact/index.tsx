import { useEffect, useState } from "react";
type ResponseType = {
    message: string;
    status: boolean;
};
export default function ContactViews() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [title, setTittle] = useState('');
    const [quantity, setQuantity] = useState('');
    const [responses, setResponses] = useState<ResponseType>();
    const [sendProcess, setSendProcess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        quantity: 0,
        image: [] as File[],
    })
    useEffect(() => {
        const hiddenInputBuyyer = document.getElementById('buyyer');
        let buyyerValue: string | null = null;
        if (hiddenInputBuyyer) {
            buyyerValue = (hiddenInputBuyyer as HTMLInputElement).value;
            setTittle('buyyer')
        }
    }, [email]);
    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files;
    //     if (!files) return;

    //     const newFiles = Array.from(files);
    //     const combinedFiles = [...formData.image, ...newFiles];

    //     if (combinedFiles.length > 1) {
    //         alert("Maksimal 1 gambar saja.");
    //         e.target.value = ""; // reset input
    //         return;
    //     }

    //     // Optional: filter duplikat berdasarkan nama
    //     const uniqueFiles = Array.from(
    //         new Map(combinedFiles.map(file => [file.name, file])).values()
    //     );

    //     setFormData((prev) => ({
    //         ...prev,
    //         image: uniqueFiles,
    //     }));
    // };
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
    const handleSubmit = async (event: any) => {

        event.preventDefault();

        try {
            const formData = new FormData(event.target);
            const results = await fetch('/api/message/contact', {
                method: "POST",
                body: formData,
            });
            const datas = await results.json();
            console.log(datas);
            const api = process.env.NEXT_PUBLIC_BACKEND_SERVICES_EMAIL;
            const response = await fetch(`${api}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...datas.message, title }),
            });


            const data = await response.json();
            if (data) {
                console.log(data);
                setResponses(data);
                setSendProcess(true);
                setTimeout(() => {
                    setSendProcess(false)
                }, 2500)
            }



        } catch (error: any) {
            setSendProcess(false)
            setTimeout(() => {
                alert("Sedang Ada Masalah, Silahkan Coba Lagi");
            }, 2000)

        }
    };
    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            {sendProcess && (
                <div
                    className="fixed top-20 right-4 z-50 bg-white border-l-4 border-pink-500 p-4 w-[280px] sm:w-[500px]"
                >
                    <p className="font-bold text-sm sm:text-base text-pink-500">{responses?.message}</p>
                    <p className="text-xs sm:text-sm text-pink-400">Terima kasih sudah menghubungi kami.</p>
                    <p className="text-xs sm:text-sm text-pink-400">Kami akan segera merespons pesan Anda secepat mungkin.</p>
                </div>
            )}

            <h1 className="text-3xl font-bold text-center mb-8 text-pink-500">Hubungi Kami</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="buyyer"
                    name="buyyer"
                    value='buyyer'
                    onChange={handleChange}
                    hidden
                    readOnly
                />
                {/* Nama */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-pink-500">Nama</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nama lengkap"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-pink-500">Email</label>
                    <input
                        onChange={handleChange}

                        type="email"
                        id="email"
                        name="email"
                        placeholder="Alamat email"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                    />
                </div>

                {/* Pesan */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-pink-500">Pesan</label>
                    <textarea
                        onChange={handleChange}
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tulis pesan Anda..."
                        className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                    />
                </div>
                {/* Quantity */}
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium mb-1 text-pink-500">Jumlah Pemesanan</label>
                    <input
                        type="quantity"
                        onChange={handleChange}

                        id="quantity"
                        name="quantity"
                        placeholder="Jumlah Pemesanan"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                    />
                </div>
                {/* Upload Gambar */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium mb-1 text-pink-500">Upload Gambar</label>
                    <input
                        name="image"
                        type="file"
                        id="image"
                        multiple
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-pink-500 file:text-white file:cursor-pointer"

                    />

                </div>



                {/* Tombol Submit */}
                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition"
                >
                    Kirim
                </button>
            </form>
        </div>
    );
}