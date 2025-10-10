'use-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
export default function FooterComponent() {

    return (
        <footer className="bg-white border-t border-pink-400 text-center text-gray-500  py-4">
            <div className="max-w-4xl mx-auto px-4  gap-2 items-center mb-6">
                <div className="flex flex-col  items-center gap-3 space-y-1  ">
                    <div className="font-bold text-xl text-pink-400 hover:text-pink-500 p hover:border-pink-400 hover:border-b">
                        NasywaArtSpace
                    </div>

                    <div className="flex flex-row justify-evenly gap-3 sm:gap-6">
                        <p className=" text-base font-semibold text-pink-400 hover:text-pink-500 hover:border-pink-400 hover:border-b  hover:text-extrabold">
                            {/* <a href="/about">About</a> */}
                            <Link href="/about" className="hover:underline underline-offset-6">About</Link>
                        </p>
                        <p className=" text-base font-semibold text-pink-400 hover:text-pink-500 hover:border-pink-400 hover:border-b  hover:text-extrabold">
                            <Link href="/products" className="hover:underline underline-offset-6">Galery</Link>
                        </p>
                        <p className=" text-base font-semibold text-pink-400 hover:text-pink-500 hover:border-pink-400 hover:border-b  hover:text-extrabold">
                            <Link href="/contadfct" className="hover:underline underline-offset-6">Contact</Link>

                        </p>
                    </div>
                    <div className="flex flex-row justify-evenly gap-4 sm:gap-8 text-pink-400 text-sm sm:text-base items-center">
                        <div className=" hover:text-pink-500 hover:border-pink-400 hover:border-b ">
                            <a className='flex flex-col items-center gap-1' href="#">
                                <FontAwesomeIcon icon={faTiktok as IconProp} size="lg" />
                                Tiktok
                            </a>
                        </div>
                        <div className=" hover:text-pink-500 hover:border-pink-400 hover:border-b ">
                            <a className='flex flex-col items-center gap-1'
                                href="https://www.instagram.com/nasywabefi/">
                                <FontAwesomeIcon icon={faInstagram as IconProp} size="lg" />
                                Instagram
                            </a>
                        </div>
                        <div className=" hover:text-pink-500 hover:border-pink-400 hover:border-b ">
                            <a className='flex flex-col items-center gap-1' href="https://id.pinterest.com/nasywabefi/">
                                <FontAwesomeIcon icon={faPinterest as IconProp} size="lg" />
                                Pinterest
                            </a>
                        </div>
                        {/* <div className=" hover:text-pink-500 hover:border-pink-400 hover:border-b ">

                            <a className='flex flex-col items-center gap-1' href="#">
                                <FontAwesomeIcon icon={faEnvelope as IconProp} size="lg" />
                                Email
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="">
                <p className="text-sm text-pink-400">&copy; 2025 HonoFly.corp All rights reserved.</p>
            </div>
        </footer>

    )
}