import styles from '../styles/Error.module.css';
const ErrorPage = () => {
    return (
        <div className={styles.notFound}>
            <div>
                <h1>Halaman Tidak Ditemukan | <span className={styles.text}>404</span></h1>

            </div>
        </div>
    );
}
export default ErrorPage;