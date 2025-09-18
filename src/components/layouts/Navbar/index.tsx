import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {

    const { data: session, status } = useSession();
    const loading = status === "loading";
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false); // Tutup menu saat masuk ke desktop
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <nav className="bg-pink-500 text-white px-6 py-4 shadow-md">
            <div className="flex justify-between items-center">
                {/* Brand */}
                <div className="text-xl font-bold">
                    <Link href="/">Tuku Ning Endi Bae</Link>
                </div>

                {/* Center Nav Links (Desktop) */}
                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="hover:underline underline-offset-6">Home</Link>
                    <Link href="/about" className="hover:underline underline-offset-6">About Me</Link>
                    <Link href="/products" className="hover:underline underline-offset-6">Products</Link>
                    {session && (
                        <Link href="/admin" className="hover:underline underline-offset-6">Admin</Link>
                    )}
                </div>

                {/* Right Auth Section (Desktop) */}
                <div className="hidden md:flex items-center space-x-4">
                    {!loading && (
                        <>
                            {session ? (
                                <>
                                    {/* <Link href="/profile" className="hover:underline">
                                        Halo, {(session?.user as { fullname: string })?.fullname || "Pengguna"}
                                    </Link> */}
                                    <button
                                        onClick={() => signOut()}
                                        className="bg-white text-pink-500 px-4 py-2 rounded hover:bg-pink-100 transition font-medium"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => signIn()}
                                    className="bg-white text-pink-500 px-4 py-2 rounded hover:bg-pink-100 transition font-medium"
                                >
                                    Sign In
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Hamburger Button (Mobile) */}
                <button
                    className="md:hidden text-white text-2xl focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute right-6 top-16 bg-pink-500 text-white rounded shadow-md p-4 space-y-2 z-50 w-max text-center">
                    <Link href="/" className="block hover:underline underline-offset-6">Home</Link>
                    <Link href="/contact" className="block hover:underline underline-offset-6">Contact</Link>
                    <Link href="/products" className="block hover:underline underline-offset-6">Products</Link>
                    {session && (
                        <Link href="/admin" className="block hover:underline underline-offset-6">Admin</Link>
                    )}
                    {!loading && (
                        <>
                            {session ? (
                                <>
                                    <button
                                        onClick={() => signOut()}
                                        className="bg-white text-pink-500 px-4 py-2 rounded hover:bg-pink-100 transition font-medium w-full"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => signIn()}
                                    className="bg-white text-pink-500 px-4 py-2 rounded hover:bg-pink-100 transition font-medium w-full"
                                >
                                    Sign In
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}

        </nav>
    );
}
export default Navbar;