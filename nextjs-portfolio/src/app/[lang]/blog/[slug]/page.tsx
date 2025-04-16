import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string; lang: string }
}) {
    const { lang: rawLang } = await params;
    const lang = rawLang.split("-")[0];

    const options = { next: { revalidate: 30 } };
    const post = await client.fetch<SanityDocument>(`*[_type == "blogPost" && slug.current == $slug && language == $lang][0]{"imageURL": image.asset->url, description, date, title, slug}`, { slug: params.slug, lang }, options);
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <img src={post.imageURL} alt={post.title} />
            <p className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
            <p className="text-lg">{post.description}</p>
        </div>
    )
}