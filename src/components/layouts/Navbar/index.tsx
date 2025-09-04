import { signIn, signOut } from 'next-auth/react';
import styles from './Navbar.module.css'
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {

    const { data: session, status } = useSession();
    const loading = status === "loading";
    return (
        <nav className={styles.navbar}>
            <div className={styles.navLeft}>
                <Link href="/" className={styles.brand}>
                    Tuku Ning Endi Bae
                </Link>
            </div>

            <div className={styles.navCenter}>
                <Link href="/" className={styles.navLink}>Home</Link>
                <Link href="/contact" className={styles.navLink}>Contact</Link>
                <Link href="/products" className={styles.navLink}>Products</Link>
                {session ? (<><Link href="/admin" className={styles.navLink}>Admin</Link></>) : (<></>)}
            </div>

            <div className={styles.navRight}>
                {!loading && (
                    <>
                        {session ? (
                            <>
                                <span className={styles.userInfo}><Link href='/profile'>Halo, {session.user?.fullname} </Link></span>
                                <button onClick={() => signOut()} className={styles.authButton}>
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <button onClick={() => signIn()} className={styles.authButton}>
                                Sign In
                            </button>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}
export default Navbar;