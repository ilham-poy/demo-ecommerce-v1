export default function ContactViews() {
    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-pink-500">Hubungi Kami</h1>
            <form className="space-y-6">
                {/* Nama */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-pink-500">Nama</label>
                    <input
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
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
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