import Navbar from "../Navbar"
import { useRouter } from "next/router";


type AppShellProps = {
    children: React.ReactNode;
}

const disableNavbar = ['/auth/login', '/auth/register', '/404'];

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();
    // const router = useRouter();
    // console.log(router);

    return (
        <>
            <main>
                {!disableNavbar.includes(pathname) && <Navbar />}
                {/* Yang Ditaro di children app shell masuk ke sini */}
                {children}
            </main>
        </>
    )

}
export default AppShell;