import type { CSSProperties } from "react";
import type { ClassAndChildren, Size, Variant } from "@sparrow/core";
import { splitProperties } from "@sparrow/core";
import { classNames } from "@sparrow/theme";
import "./text.scss";

type TypingProps = {
  color?: CSSProperties["color"];
  fontWeight?: CSSProperties["fontWeight"];
  textAlign?: CSSProperties["textAlign"];
  size?: Size;
  whiteSpace?: CSSProperties["whiteSpace"];
  variant?: Variant;
};

const pickProps = splitProperties("color", "fontWeight", "textAlign", "whiteSpace");

export function Text(props: ClassAndChildren<TypingProps>) {
  const { className, children, size, variant, ...libProps } = props;

  const [style, rest] = pickProps(libProps);

  const Component = SizeMap[size || "medium"];

  return (
    <Component className={classNames("text", className, `size-${size}`, `variant-${variant}`)} style={style} {...rest}>
      {children}
    </Component>
  );
}

const SizeMap: Record<Size, keyof JSX.IntrinsicElements> = {
  xxSmall: "p",
  xSmall: "p",
  small: "p",
  medium: "p",
  large: "h4",
  xLarge: "h3",
  xxLarge: "h2",
  xxxLarge: "h1",
};
