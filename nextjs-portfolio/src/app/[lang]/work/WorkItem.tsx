import { LinkRenderer } from "@/Renderers";
import translations, { Lang } from "@/translations";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Markdown from "react-markdown";

export default async function WorkItem({ post, locale }: { post: SanityDocument, locale: Lang }) {
    const LANG = locale === "en" ? "en-US" : "fi-FI";

    return (
        <li key={post._id} className="flex-row gap-x-4 flex items-center">
            <Image src={post.imageURL} alt={post.company} width={50} height={50} className="rounded-md object-cover object-center" />
            <div>
                <h2 className="text-2xl font-bold">{post.position}</h2>
                <p>{post.company}, {new Date(post.startDate).toLocaleDateString(LANG, { month: "long", year: "numeric" })} - {!post.stillWorksHere ? new Date(post.endDate).toLocaleDateString(LANG, { month: "long", year: "numeric" }) : translations(locale)("current")}</p>
                <Markdown 
                    components={{
                        link: LinkRenderer
                    }}
                    className="max-w-prose text-gray-500 [&_a]:text-blue-300 [&_a]:hover:underline"
                >
                        {post.description}
                </Markdown>
            </div>
        </li>
    );
}