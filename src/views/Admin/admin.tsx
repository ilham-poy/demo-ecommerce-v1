import styles from './Admin.module.css'
import { useState } from 'react';
import AdminWrapper from './wrapper';
import { faBoxOpen, faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function AdminViews() {
    const [activePage, setActivePage] = useState('slider'); // State untuk melacak halaman aktif



    return (
        // <div className={styles.adminContainer}>
        //     {/* Sidebar untuk Navigasi */}
        //     <aside className={styles.sidebar}>
        //         <div className={styles.logo}>
        //             <h2>Dashboard Admin</h2>
        //         </div>
        //         <nav className={styles.nav}>
        //             <ul>
        //                 <li>
        //                     <a
        //                         href="#"
        //                         onClick={() => setActivePage('slider')}
        //                         className={activePage === 'slider' ? `${styles.navLink} ${styles.active}` : styles.navLink}
        //                     >
        //                         Content Slider
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a
        //                         href="#"
        //                         onClick={() => setActivePage('products')}
        //                         className={activePage === 'products' ? `${styles.navLink} ${styles.active}` : styles.navLink}
        //                     >
        //                         Add Product
        //                     </a>
        //                 </li>
        //             </ul>
        //         </nav>
        //     </aside>

        //     {/* Konten Utama */}
        //     <main className={styles.mainContent}>
        //         <AdminWrapper activePage={activePage} />
        //     </main>
        // </div>
        <div className="flex min-h-screen  w-full box-border bg-[#f0f2f5] text-gray-800 font-sans">
            {/* Sidebar */}
            <aside className="w-[60px] md:w-[230px] bg-white text-white p-2 md:p-5 shadow-md flex flex-col items-center md:items-center transition-all duration-300">
                {/* Logo */}
                <div className="text-center mb-6 hidden md:block">
                    <h2 className="text-xl font-semibold text-pink-400">Dashboard Admin</h2>
                </div>

                {/* Navigation */}
                <nav>
                    <ul className="space-y-2 w-full">
                        <li>
                            <a
                                href="#"
                                onClick={() => setActivePage('slider')}
                                className={`flex items-center justify-center md:justify-start px-2 md:px-4 py-3 text-pink-500 rounded transition-colors ${activePage === 'slider'
                                    ? 'bg-pink-400 text-white'
                                    : 'hover:bg-pink-400 hover:text-white'
                                    }`}
                            >
                                <FontAwesomeIcon icon={faImages} className="text-lg" />
                                <span className="hidden md:inline ml-3">Content Slider</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => setActivePage('products')}
                                className={`flex items-center justify-center md:justify-start px-2 md:px-4 py-3 text-pink-500 rounded transition-colors ${activePage === 'products'
                                    ? 'bg-pink-400 text-white'
                                    : 'hover:bg-pink-400 hover:text-white'
                                    }`}
                            >
                                <FontAwesomeIcon icon={faBoxOpen} className="text-lg" />
                                <span className="hidden md:inline ml-3">Add Product</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 box-border ">
                <AdminWrapper activePage={activePage} />
            </main>
        </div>


    );
}