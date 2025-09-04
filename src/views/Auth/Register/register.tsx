import Link from "next/link";
import styles from './Register.module.css'
import { useState } from "react";
import { useRouter } from "next/router";
const RegisterViews = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { push } = useRouter();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError('')
        setIsLoading(true)
        const data = {
            email: event.target.email.value,
            fullname: event.target.fullname.value,
            password: event.target.password.value,
        };
        const results = await fetch('/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        if (results.status === 200) {
            event.target.reset();
            setIsLoading(false);
            push('/auth/login')
        } else {
            setIsLoading(false);
            setError(results.status === 400 ? 'Email Already Exists' : '')

        }
    }
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Register</h1>
                    {error &&
                        <p className={styles.error}>{error}</p>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input type="email" id="email" name="email" className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="fullname" className={styles.label}>Full Name</label>
                            <input type="text" id="fullname" name="fullname" className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <input type="password" id="password" name="password" className={styles.input} />
                        </div>
                        <button type="submit" className={styles.button} disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Register'}
                        </button>
                    </form>
                    <p className={styles.loginPrompt}>
                        Have an Account? Sign In <Link href='/auth/login'>here</Link>
                    </p>
                </div>
            </div>

        </>
    );

};

export default RegisterViews;