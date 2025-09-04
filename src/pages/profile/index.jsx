import { useSession } from "next-auth/react";
import styles from './Profile.module.css';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    if (loading) {
        return <div className={styles.loadingContainer}>Memuat data profil...</div>;
    }

    if (!session) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Akses Ditolak</h1>
                <p className={styles.message}>Anda harus login untuk melihat halaman ini.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Profil Pengguna</h1>
            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    {/* Placeholder untuk foto profil */}
                    <div className={styles.avatar}>
                        <img src={session.user?.image || 'https://via.placeholder.com/150'} alt="Foto Profil" />
                    </div>
                </div>
                <div className={styles.profileBody}>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Nama Lengkap</span>
                        <span className={styles.value}>{session.user?.fullname}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Email</span>
                        <span className={styles.value}>{session.user?.email}</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.label}>Account</span>
                        <span className={styles.value}>{session.user?.role == 'buyyer' ? 'Pembeli' : ''}</span>
                    </div>
                    {/* Anda bisa menambahkan info lain di sini */}
                </div>
            </div>
        </div>
    );
}