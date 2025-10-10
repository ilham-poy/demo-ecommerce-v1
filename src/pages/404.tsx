import Link from 'next/link';
const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    Halaman Tidak Ditemukan | <span className="text-pink-500 text-3xl sm:text-4xl font-extrabold">404</span>
                </h1>
                <p className="mt-4 text-gray-600 text-sm sm:text-xl">
                    Maaf, halaman yang kamu cari tidak tersedia.
                </p>
                <Link href='/'
                    className="mt-6 inline-block px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
export default ErrorPage;