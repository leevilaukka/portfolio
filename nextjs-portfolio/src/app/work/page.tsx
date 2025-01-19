import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import WorkItem from "./WorkItem";
import translations, { LANG } from "@/translations";

const i = translations(LANG);

const POSTS_QUERY = `
  *[_type == "work" && language == $language]
  { _id, company, position,"imageURL": image.asset->url, location, startDate, endDate, stillWorksHere, description, nonIT,
   "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->
    {company, position,"imageURL": image.asset->url, location, startDate, endDate, stillWorksHere, description, nonIT}, } 
    | order(startDate desc)`;

const options = { next: { revalidate: 30 } };

export default async function WorkPage() {
  const workList = await client.fetch<SanityDocument[]>(POSTS_QUERY, {language: LANG}, options);
  const it = workList.filter((post) => !post.nonIT);
  const nonIt = workList.filter((post) => post.nonIT);

  return (
    <main className="container mx-auto max-w-3xl p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">{i("workTitle")}</h1>
      <h2 className="text-2xl font-bold mb-4">IT</h2>
      <ul className="flex flex-col gap-y-4 mb-8">
        {it.map((post) => (
          <WorkItem key={post._id} post={post} locale={LANG} />
        ))}
      </ul>

      <h1 className="text-2xl font-bold mb-4">{i("nonIT")}</h1>
      <ul className="flex flex-col gap-y-4">
        {nonIt.map((post) => (
          <WorkItem key={post._id} post={post} locale={LANG} />
        ))}
      </ul>
    </main>
  );
}