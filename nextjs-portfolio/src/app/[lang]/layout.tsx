
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import translations, { Lang,  } from "@/translations";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const lang = params.lang.split("-")[0];
  const i = translations(lang as Lang);

  return (
    <html lang={params.lang}>
      <body
        className={`${interSans.variable} font-sans antialiased`}
      >
          <header className="bg-emerald-800 text-white p-1 shadow-md sticky top-0 z-10 backdrop-blur backdrop-filter bg-opacity-50 dark:bg-opacity-70">
            <nav className="container mx-auto p-4 flex flex-col gap-y-1 items-center">
              <h1 className="text-xl font-bold"><Link href="/" className="hover:underline text-white">Leevi Laukka</Link></h1>
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
        {children}
      </body>
    </html>
  );
}
