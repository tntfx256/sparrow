import type { ClassAndChildren, Variant } from "@sparrow/core";
import { classNames } from "@sparrow/theme";
import { Box } from "./layout/box";
import { Text } from "./typography";
import "./badge.scss";

type BadgeProps = {
  count: number | string;
  variant?: Variant;
};

export function Badge(props: ClassAndChildren<BadgeProps>) {
  const { className, children, variant = "destructive", count } = props;

  return (
    <Box className={classNames("badge-wrapper", { [`${className}-badge-wrapper`]: className })}>
      {children}
      {Boolean(count) && (
        <Box className={classNames("badge", className, `variant-${variant}`)}>
          <Text fontWeight="bold" size="xSmall">
            {count}
          </Text>
        </Box>
      )}
    </Box>
  );
}
