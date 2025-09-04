import Link from "next/link";
import styles from './Login.module.css'
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
const LoginViews = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { push, query } = useRouter();
    const callBackUrl: any = query.callBackUrl || '/';

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError('')
        setIsLoading(true)

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callBackUrl
            })

            if (!res?.error) {
                setIsLoading(false);
                push(callBackUrl);
            } else {
                setIsLoading(false);
                setError(res.error);
            }
        } catch (error: any) {
            setIsLoading(false);
            setError(error);

        }


    }
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Login</h1>
                    {error &&
                        <p className={styles.error}>{error}</p>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input type="email" id="email" name="email" className={styles.input} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <input type="password" id="password" name="password" className={styles.input} />
                        </div>
                        <button type="submit" className={styles.button} disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                    <p className={styles.loginPrompt}>
                        Don't have an Account? Sign Up <Link href='/auth/register'>here</Link>
                    </p>
                </div>
            </div>

        </>
    );

};

export default LoginViews;