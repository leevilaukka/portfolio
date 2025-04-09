import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { Key, Suspense } from "react";
import Markdown from "react-markdown";
import translations, { Lang } from "@/translations";
import Icon from "@/app/[lang]/components/Icon";
import { Metadata } from "next";
import { CodeRenderer } from "@/Renderers";

const POSTS_QUERY = `*[_type == "project" && language == $language]{ _id, title, description, link, github, tech, date, "images": images[]{"url": asset->url, "metadata": asset->metadata}, "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->
    {title, description, link, github, tech, date, "images": images[]{"url": asset->url, "metadata": asset->metadata}} } | order(date desc)`;

const options = { next: { revalidate: 30 } };

export async function generateMetadata({ params }): Promise<Metadata> {
  const { lang } = await params;
  const i = translations(lang.split("-")[0] as Lang);

  return {
    title: i("projectsTitle"),
    alternates: {
      languages: {
        "fi": "/fi-FI/projects",
        "en": "/en-US/projects",
      },
    },
    keywords: ["Leevi Laukka", "Portfolio", "Web Developer", "Software Engineer"],
    description: i("projects"),
    openGraph: {
      title: i("projectsTitle"),
      alternateLocale: [ "fi-FI", "en-US" ],
      description: i("projects"),
      url: "leevila.fi",
      type: "website",
    },
    twitter: {
      title: i("projectsTitle"),
      card: "summary",
      creator: "@LeeviLaukka",
      images: [
        {
          url: "https://leevila.fi/twitter-image.jpg",
          alt: "Leevi Laukka",
        },
      ],
    },
  }
};

export default async function ProjectPage({params}: any) {
  const {lang: rawLang} = await params;
  const lang = rawLang.split("-")[0];
  const projectList = await client.fetch<SanityDocument[]>(POSTS_QUERY, { language: lang }, options);

  const i = translations(lang as Lang);

  return (
    <main className="container mx-auto max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">{i("projectsTitle")}</h1>
      <ul className="flex flex-col gap-y-16">
        {projectList.map((post) => (
          <li key={post._id}>
            <div className="flex flex-col gap-y-4">
              <div className="prose dark:prose-invert">
                <h2 className="text-2xl font-bold mt-0">
                  {post.title}
                </h2>
                <div className="not-prose">
                  <ul className="flex gap-x-2 mt-4">
                    {post.tech?.map((tech: string, index: Key) => (
                      <li key={index} className="text-xs text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-2 py-0.5 rounded-full">{tech}</li>
                    ))}
                  </ul>
                </div>
                <Markdown
                  components={{
                    code: CodeRenderer
                  }}
                >{post.description}</Markdown>
              </div>
              {post.images && (
                <div className="grid grid-cols-3 gap-3">
                  {post.images.map((image: {
                    url: string, metadata: {
                      dimensions: {
                        width: number, height: number
                      }
                    }
                  }, index: Key) => (
                    <Suspense key={index} fallback={<div className="flex w-full aspect-video rounded bg-gray-100 dark:bg-gray-900 overflow-hidden"></div>}>
                      <div key={index} className="flex w-full aspect-video rounded bg-gray-100 dark:bg-gray-900 overflow-hidden">
                        <Image src={`${image.url}?w=400&fit=max`} alt={post.title} width={image.metadata.dimensions.width} height={image.metadata.dimensions.height} />
                      </div>
                    </Suspense>
                  ))}
                </div>
              )}
              <div className="flex gap-x-4">
                {post.link && (<Link href={post.link} target="_blank" rel="noopener noreferrer" className="group flex items-center text-white bg-emerald-800 px-3 gap-2.5 py-1.5 rounded">
                  <span className="group-hover:underline">{i("openproject")}</span>
                  <Icon name="external_link" />
                </Link>)}
                {post.github && <Link href={post.github} target="_blank" rel="noopener noreferrer" className="group flex items-center text-white bg-gray-800 px-3 gap-2.5 py-1.5 rounded">
                  <span className="group-hover:underline">Github</span>
                  <Icon name="github" />
                </Link>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}