
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import translations, { LANG } from "@/translations";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});


const i = translations(LANG);


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={LANG}>
      <title>Leevi Laukka</title>
      <body
        className={`${interSans.variable} font-sans antialiased`}
      >
        <div>
          <header className="bg-emerald-800 text-white">
            <nav className="container mx-auto p-4 flex flex-col gap-y-1 items-center">
              <h1 className="text-xl font-bold"><Link href="/" className="hover:underline">Leevi Laukka</Link></h1>
              <ul className="flex gap-x-4 justify-center items-center text-md font-semibold">
                <li>
                  <Link className="hover:underline" href="/work">{i("work")}</Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/education">{i('education')}</Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/projects">{i("projects")}</Link>
                </li>
              </ul>
            </nav>
          </header>
        </div>
        {children}
      </body>
    </html>
  );
}
