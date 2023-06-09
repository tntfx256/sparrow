import ReactMarkdown from "react-markdown";
import type { ClassAndChildren } from "@sparrow/core";
import { classNames } from "@sparrow/theme";
import "./markdown.scss";

export function Markdown(props: ClassAndChildren) {
  const { className, children } = props;

  return (
    <ReactMarkdown className={classNames("markdown", className)} linkTarget="_blank">
      {children as string}
    </ReactMarkdown>
  );
}
