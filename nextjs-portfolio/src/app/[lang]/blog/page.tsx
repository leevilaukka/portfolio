import { client } from "@/sanity/client";
import translations, { Lang } from "@/translations";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

const POSTS_QUERY = `*[_type == "blogPost" && language == $language]{ _id, title, "imageURL": image.asset->url, slug, date, description, "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{title, "imageURL": image.asset->url, slug, date, description}} | order(date desc)`;
const options = { next: { revalidate: 30 } };


export default async function BlogPage({ params }: any) {
    const { lang: rawLang } = await params;
    const lang = rawLang.split("-")[0];

    const blogPosts = await client.fetch<SanityDocument[]>(POSTS_QUERY, { language: lang }, options);
    const i = translations(lang as Lang);

    console.log(blogPosts);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-4xl font-bold mt-4">{}</h1>
            <ul className="flex flex-col gap-y-4 mt-8 max-w-3xl w-full">
                {blogPosts.map((post) => (
                    <Link href={`/blog/${post.slug.current}`} key={post._id} className="w-full">
                        <li className="flex gap-x-4 gap-y-4 items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                            <img src={post.imageURL} alt={post.title} width={50} height={50} />
                            <div className="flex flex-col gap-y-2 w-full">
                                <h2 className="text-xl font-bold">{post.title}</h2>
                                <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
                                <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div >
    )
}