import { client } from "@/sanity/client";
import Markdown from "react-markdown";

import Image from "next/image";
import Link from "next/link";
import Icon from "./components/Icon";
import translations, { Lang } from "@/translations";

export const metadata = {
  title: "Leevi Laukka"
};

export default async function IndexPage({params}: any) {
  const PROFILE_QUERY = `*[_type == "profile" && language == $language]{ _id, title, location, description, email, github, linkedin, skills, "imageURL": image.asset->url, "cv": cv.asset->url, phone, "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->
    {title, name, location, description, email, github, linkedin, skills,  "imageURL": image.asset->url, "cv": cv.asset->url, phone} }`;

  const options = { next: { revalidate: 30 } };

  const [profile] = await client.fetch(PROFILE_QUERY, { language: params.lang.split("-")[0] }, options);

  const i = translations(params.lang.split("-")[0] as Lang);

  return (
    <div className="profile p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <Image src={profile.imageURL} alt={profile.title} width={150} height={150} className="profile-image rounded-full mx-auto" />
      <h1 className="profile-title text-3xl font-bold text-center mt-4">{profile.title}</h1>
      <p className="profile-location text-center text-gray-600">{profile.location}</p>
      <div className="profile-social text-center mt-4 flex justify-center">
        <Link href={`mailto:${profile.email}`} className="profile-email text-blue-500 hover:underline mt-2 mr-4">
          <Icon name="email" />
        </Link>
        <Link href={profile.github} className="profile-github text-blue-500 hover:underline mt-2" target="_blank" rel="noopener noreferrer">
          <Icon name="github" />
        </Link>
        <Link href={profile.linkedin} className="profile-linkedin text-blue-500 hover:underline mt-2 ml-4" target="_blank" rel="noopener noreferrer">
          <Icon name="linkedin" />
        </Link>
        </div>
      <Link href={`${profile.cv}?dl=CV_${(profile.title as string).split(" ")[0]}_${(profile.title as string).split(" ")[1]}_${params.lang.split("-")[0].toUpperCase()}.pdf`} className="profile-cv text-blue-500 hover:underline mt-4 block text-center">
        <Icon name="download" /> {i("download")} CV
      </Link>
      <Markdown className="profile-description mt-4 text-gray-700 prose text-center text-pretty">{profile.description}</Markdown>
      <div className="profile-contact mt-4 text-center">
      </div>
      <h2 className="profile-skills-title text-2xl font-semibold mt-6 text-center">{i("skills")}</h2>
      <ul className="profile-skills list-disc list-inside mt-2 space-y-1">
        {profile.skills.map((skill: string, index: number) => (
          <li key={index} className="profile-skill text-gray-700">{skill}</li>
        ))}
      </ul>
    </div>
  );
}