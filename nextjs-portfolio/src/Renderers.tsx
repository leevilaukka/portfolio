export const LinkRenderer = (props: any) => {
    return <a href={props.href} target="_blank" >{props.children}</a>;
};