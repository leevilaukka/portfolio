import { ClassAttributes, LinkHTMLAttributes } from "react";
import { ExtraProps } from "react-markdown";

export const LinkRenderer = (props: ClassAttributes<HTMLLinkElement> & LinkHTMLAttributes<HTMLLinkElement> & ExtraProps) => {
    return <a href={props.href} target="_blank" >{props.children}</a>;
};

export const CodeRenderer = (props: ClassAttributes<HTMLElement> & React.HTMLProps<HTMLElement> & ExtraProps) => {
    return <code className="bg-gray-200 dark:bg-gray-800 rounded-md px-1 py-0.5 mx-1 not-prose">{props.children}</code>;
}