import { client } from "@/sanity/client";
import { LANG } from "@/translations";
import Markdown from "react-markdown";

import Image from "next/image";

export default async function IndexPage() {
  const PROFILE_QUERY = `*[_type == "profile" && language == $language]{ _id, title, location, description, email, github, skills, "imageURL": image.asset->url, phone, "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->
    {title, name, location, description, email, github, skills,  "imageURL": image.asset->url, phone} }`;

  const options = { next: { revalidate: 30 } };

  const [profile] = await client.fetch(PROFILE_QUERY, { language: LANG }, options);

  return (
    <main className="container p-8">
      <title>Leevi Laukka</title>
      <h1 className="text-4xl font-bold mb-8">{profile.name}</h1>
      <p className="text-lg">{profile.title}</p>
      <p className="text-lg">{profile.location}</p>
      <p className="text-lg">{profile.email}</p>
      <p className="text-lg">{profile.phone}</p>
      <Image width={50} height={50} src={profile.imageURL} alt={profile.name} />
      <Markdown>{profile.description}</Markdown>
    </main>
  );
}