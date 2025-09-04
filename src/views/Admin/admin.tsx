import styles from './Admin.module.css'
import { useState } from 'react';
import AdminWrapper from './wrapper';
export default function AdminViews() {
    const [activePage, setActivePage] = useState('slider'); // State untuk melacak halaman aktif



    return (
        <div className={styles.adminContainer}>
            {/* Sidebar untuk Navigasi */}
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <h2>Dashboard Admin</h2>
                </div>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <a
                                href="#"
                                onClick={() => setActivePage('slider')}
                                className={activePage === 'slider' ? `${styles.navLink} ${styles.active}` : styles.navLink}
                            >
                                Content Slider
                            </a>
                        </li>
                        {/* <li>
                            <a
                                href="#"
                                onClick={() => setActivePage('promo')}
                                className={activePage === 'promo' ? `${styles.navLink} ${styles.active}` : styles.navLink}
                            >
                                Content Promo
                            </a>
                        </li> */}
                        <li>
                            <a
                                href="#"
                                onClick={() => setActivePage('products')}
                                className={activePage === 'products' ? `${styles.navLink} ${styles.active}` : styles.navLink}
                            >
                                Add Product
                            </a>
                        </li>
                        {/* <li>
                            <a
                                href="#"
                                onClick={() => setActivePage('history')}
                                className={activePage === 'history' ? `${styles.navLink} ${styles.active}` : styles.navLink}
                            >
                                Histori
                            </a>
                        </li> */}
                    </ul>
                </nav>
            </aside>

            {/* Konten Utama */}
            <main className={styles.mainContent}>
                <AdminWrapper activePage={activePage} />
            </main>
        </div>
    );
}