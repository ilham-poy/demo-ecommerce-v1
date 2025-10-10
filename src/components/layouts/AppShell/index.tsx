import Navbar from "../Navbar"
import { useRouter } from "next/router";
import FooterComponent from "../Footer";

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

            <main className="">
                {!disableNavbar.includes(pathname) && <Navbar />}
                {/* Yang Ditaro di children app shell masuk ke sini */}
                {children}
                <FooterComponent></FooterComponent>
            </main>
        </>
    )

}
export default AppShell;