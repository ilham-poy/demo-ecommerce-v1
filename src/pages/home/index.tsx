import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

import HomeViews from "@/views/Home";



export default function HomePage() {
    const [contents, setContents] = useState([]);
    useEffect(() => {
        fetch('/api/contents')
            .then((res) => res.json())
            .then((response) => setContents(response.data));
    }, [])

    return (
        <>
            <HomeViews contents={contents}></ HomeViews >
        </>
    );
}
