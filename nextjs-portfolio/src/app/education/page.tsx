import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import Markdown from "react-markdown";
import { LANG } from "@/translations";

const POSTS_QUERY = `*[_type == "education" && language == $language]{ _id, institution, "imageURL": image.asset->url, degree, location, startDate, endDate, description, courses, "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{institution, "imageURL": image.asset->url, degree, location, startDate, endDate, description, courses}} | order(startDate desc)`;

const options = { next: { revalidate: 30 } };

export default async function EducationPage() {
  const educationList = await client.fetch<SanityDocument[]>(POSTS_QUERY, {language: LANG}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Education</h1>
      <p className="flex mb-4">Here is a list of my education history:</p>
      <ul className="flex flex-col gap-y-4">
        {educationList.map((post) => (
          <li key={post._id} className="flex gap-x-4 gap-y-4 items-center">
            <Image src={post.imageURL} alt={post.institution} width={50} height={50} />
            <div>
              <div className="flex flex-row gap-x-4 items-center">
                <h2 className="text-2xl font-bold">{post.institution}</h2>
                <p className="text-sm text-gray-500">{post.location}</p>
              </div>
              <p>{post.degree}, {new Date(post.startDate).toLocaleDateString("fi-FI")} - {new Date(post.endDate).toLocaleDateString("fi-FI")}</p>
              <Markdown>{post.description}</Markdown>
              {post.courses && (
                <div className="flex flex-col mt-2">
                  <p>Relevant courses:</p>
                  <ul className="flex flex-col gap-y-1 ml-4">
                    {post.courses.map((item: {course: string, credits: number, grade: number}, index: number) => (
                      <li key={index}>{item.course}, {item.credits} cr, Grade: {item.grade}</li>
                    ))}
                  </ul>
                </div>
              )
              }
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}