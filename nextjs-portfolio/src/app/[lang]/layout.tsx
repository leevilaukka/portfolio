
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import translations, { Lang, } from "@/translations";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import { Params } from "next/dist/server/request/params";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<Params & { lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang;
  const i = translations(lang.split("-")[0] as Lang);

  return {
    title: {
      template: "%s | Leevi Laukka",
      default: "Leevi Laukka",
    },
    keywords: ["Leevi Laukka", "Portfolio", "Web Developer", "Software Engineer"],
    openGraph: {
      title: {
        template: "%s | Leevi Laukka",
        default: "Leevi Laukka",
      },
      alternateLocale: ["fi-FI", "en-US"],
      description: i("ogDesc"),
      url: "https://leevila.fi",
      type: "website",
      images: [
        {
          url: "https://leevila.fi/opengraph-image.jpg",
          alt: "Leevi Laukka",
        },
      ],
      locale: lang,
      siteName: "Leevi Laukka",
    },
    twitter: {
      card: "summary",
      title: {
        template: "%s | Leevi Laukka",
        default: "Leevi Laukka",
      },
      creator: "@LeeviLaukka",
      description: i("ogDesc"),
      site: "https://leevila.fi",
      creatorId: "@LeeviLaukka",
      images: [
        {
          url: "https://leevila.fi/twitter-image.jpg",
          alt: "Leevi Laukka",
        },
      ],
    },   
    alternates: {
      languages: {
        "fi": "/fi-FI",
        "en": "/en-US",
      },
    },
    description: i("ogDesc"),
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: any
}>) {
  const { lang } = await params;
  const i = translations(lang.split("-")[0] as Lang);

  return (
    <html lang={lang}>
      <SpeedInsights />
      <Analytics />
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
        <footer className="bg-emerald-800 text-white p-4 md:w-[80%] sm:w-full shadow-md md:bottom-[1rem] z-10 backdrop-blur backdrop-filter bg-opacity-70 dark:bg-opacity-70 md:mb-4 mt-6 md:rounded-lg mx-auto">
          <div className="container mx-auto flex justify-center items-center">
            <p className="text-sm">&copy; Leevi Laukka 2025 | Built using <Link className="text-blue-700 dark:text-blue-500 hover:underline" href={"https://nextjs.org/"} target="_blank">Next.js</Link>, <Link className="text-blue-700 dark:text-blue-500 hover:underline" href={"https://tailwindcss.com/"} target="_blank">Tailwind</Link> and <Link className="text-blue-700 dark:text-blue-500 hover:underline" href={"https://www.sanity.io/"} target="_blank">Sanity CMS</Link> | Hosted on <Link className="text-blue-700 dark:text-blue-500 hover:underline" href={"https://www.vercel.com/"} target="_blank">Vercel</Link>
            </p>
          </div>
        </footer>

      </body>
    </html >
  );
}




