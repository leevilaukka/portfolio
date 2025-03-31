import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import WorkItem from "./WorkItem";
import translations, { Lang } from "@/translations";
import { Metadata } from "next";



const POSTS_QUERY = `
  *[_type == "work" && language == $language]
  { _id, company, position,"imageURL": image.asset->url, location, startDate, endDate, stillWorksHere, description, nonIT,
   "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->
    {company, position,"imageURL": image.asset->url, location, startDate, endDate, stillWorksHere, description, nonIT}, } 
    | order(startDate desc)`;

const options = { next: { revalidate: 30 } };

export async function generateMetadata({params}: any): Promise<Metadata> {
  const lang = await (params).lang.split("-")[0];
  const i = translations(lang as Lang);

  return {
    title: `${i("workTitle")} | Leevi Laukka`
  };
}

export default async function WorkPage({
  params
}: Readonly<{
  params:any
  // params: { lang: string }
}>) {
  const LANG = await (params).lang.split("-")[0];
  const i = translations(await LANG as Lang);
  const workList = await client.fetch<SanityDocument[]>(POSTS_QUERY, {language: params.lang.split("-")[0]}, options);
  const it = workList.filter((post) => !post.nonIT);
  const nonIt = workList.filter((post) => post.nonIT);

  const str = i("relevantCourses")

  return (
    <main className="container mx-auto max-w-3xl p-8 min-h-fit">
      <h1 className="text-3xl font-bold mb-8">{i("workTitle")}</h1>
      <h2 className="text-2xl font-bold mb-4">IT</h2>
      <ul className="flex flex-col gap-y-4 mb-8">
        {it.map((post) => (
          <WorkItem key={post._id} post={post} locale={LANG as Lang} />
        ))}
      </ul>

      <h1 className="text-2xl font-bold mb-4">{i("nonIT")}</h1>
      <ul className="flex flex-col gap-y-4">
        {nonIt.map((post) => (
          <WorkItem key={post._id} post={post} locale={LANG as Lang} />
        ))}
      </ul>
    </main>
  );
}