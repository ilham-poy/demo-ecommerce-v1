export default function AboutMeViews() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800 space-y-12">
            {/* Founder Section */}
            <section aria-labelledby="owner-heading" className="flex flex-col md:flex-row gap-6">
                <aside className="md:w-1/3">
                    <header className="relative w-64 h-64 rounded-md mx-auto shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                        <img
                            src="/owner.jpg"
                            alt="Foto Founder"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 w-full bg-black/30 text-white text-center px-4 py-2">
                            <h2 className="text-sm font-medium">Founder</h2>
                            <div className="max-h-0 overflow-hidden group-hover:max-h-10 transition-all duration-300">
                                <p className="text-sm">Nasywa Befiputri</p>
                            </div>
                        </div>
                    </header>
                </aside>
                <article className="md:w-2/3">
                    <p className="text-lg leading-relaxed">
                        Dari dulu aku suka banget sama hal-hal yang berhubungan sama seni dan kreatif. Buat aku, seni itu bukan cuma gambar atau hiasan, tapi cara aku buat cerita, nyampein emosi, dan connect sama orang lain. Makanya aku bikin Nasywa Art Space, biar jadi ruang di mana aku bisa berbagi karya yang ada maknanya.

                    </p>
                    {/* <p className="mt-4 text-lg leading-relaxed">
                        Ia memimpin dengan filosofi minimalis dan efisiensi, memastikan setiap fitur yang dirilis benar-benar memberi nilai bagi pengguna. Di balik layar, Raka aktif mengembangkan sistem modular dan scalable agar platform ini siap tumbuh bersama komunitasnya.
                    </p> */}
                </article>
            </section>

            {/* Brand Section */}
            <section aria-labelledby="brand-heading">
                <header>
                    <h2 id="brand-heading" className="text-xl font-semibold mb-4">Tentang Brand</h2>
                </header>
                <article>
                    <p className="text-lg leading-relaxed">
                        Nasywa Art Space itu brand yang aku bangun dari hati. Fokusnya di ilustrasi, desain, dan karya seni yang bisa bikin orang ngerasa relate. Buat aku, seni itu harus bisa nyentuh, entah itu buat ekspresi diri, jadi hadiah, atau sekadar hiasan yang punya cerita di baliknya.
                    </p>
                    {/* <p className="mt-4 text-lg leading-relaxed">
                        Kami percaya bahwa desain bukan hanya soal estetika, tapi juga tentang bagaimana pengguna merasa saat berinteraksi. Itulah mengapa kami terus menyempurnakan UI/UX kami agar tetap minimal, elegan, dan mudah diakses oleh semua orang.
                    </p> */}
                </article>
            </section>

            {/* Visi & Misi Section */}
            <section aria-labelledby="vision-heading">
                <header>
                    <h2 id="vision-heading" className="text-xl font-semibold mb-4">Visi & Misi</h2>
                </header>
                <article className="space-y-4 text-lg leading-relaxed">
                    <p><strong>Visi:</strong> Aku pengen Nasywa Art Space jadi ruang seni yang bukan cuma indah, tapi juga bisa bikin orang ngerasa dekat sama makna di balik tiap karya.</p>
                    <p><strong>Misi:</strong></p>
                    <ol className="list-disc pl-6">
                        <li>Bikin karya yang original, personal, dan ada ceritanya.</li>
                        <li>Kasih produk yang bisa diakses semua orang tapi tetep berkualitas.</li>
                        <li>Layani tiap orang dengan cara yang personal biar mereka ngerasa special.</li>
                        <li>Bangun komunitas pecinta seni yang saling support dan saling inspire.</li>
                    </ol>
                </article>
            </section>

            {/* Nilai-Nilai Section */}
            <section aria-labelledby="values-heading">
                <header>
                    <h2 id="values-heading" className="text-xl font-semibold mb-4">Nilai-Nilai Kami</h2>
                </header>
                <ul className="space-y-3 text-lg leading-relaxed">
                    <li><strong>Keaslian: </strong> Aku selalu bikin karya yang jujur dari hati, nggak sekadar ikut tren.</li>
                    <li><strong>Ketulusan: </strong> Setiap karya aku usahain kasih service yang tulus dan ramah.</li>
                    <li><strong>Kreativitas: </strong> Aku suka explore ide-ide baru biar karyanya fresh.</li>
                    <li><strong>Kualitas: </strong> Aku jaga banget kualitas biar layak dikoleksi atau dijadiin</li>
                    <li><strong>Makna: </strong> Buat aku, karya itu harus ada value emosional, nggak cuma jadi barang.</li>
                </ul>
            </section>
        </main>


    )
}