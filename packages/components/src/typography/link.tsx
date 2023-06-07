import type { CSSProperties, HTMLAttributes } from "react";
import type { ClassAndChildren, Size } from "@sparrow/core";
import { classNames } from "@sparrow/theme";
import { Text } from "./text";
import { Svg } from "../svg";
import "./link.scss";

type N = HTMLAttributes<HTMLAnchorElement>;

type LinkProps = {
  size?: Size;
  href?: string;
  title?: string;
  external?: boolean;
  whiteSpace?: CSSProperties["whiteSpace"];
  onClick?: N["onClick"];
};

export function Link(props: ClassAndChildren<LinkProps>) {
  const { className, children, external, title, size, whiteSpace, ...libProps } = props;

  return (
    <a
      className={classNames("link", className)}
      title={title}
      {...(external ? { rel: "noreferrer", target: "_blank" } : null)}
      {...libProps}
    >
      {children || (
        <Text size={size} whiteSpace={whiteSpace}>
          {title}
        </Text>
      )}
      {external && <Svg name="linkExternal" />}
    </a>
  );
}
