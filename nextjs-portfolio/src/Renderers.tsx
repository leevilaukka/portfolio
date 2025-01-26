import { ClassAttributes, LinkHTMLAttributes } from "react";
import { ExtraProps } from "react-markdown";

export const LinkRenderer = (props: ClassAttributes<HTMLLinkElement> & LinkHTMLAttributes<HTMLLinkElement> & ExtraProps) => {
    return <a href={props.href} target="_blank" >{props.children}</a>;
};