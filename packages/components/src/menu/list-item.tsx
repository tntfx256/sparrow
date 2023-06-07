import type { ClassAndChildren } from "@sparrow/core";
import { classNames } from "@sparrow/theme";
import "./list-item.scss";

export type MenuItemProps = {
  onClick?: () => void;
};

export function ListItem(props: ClassAndChildren<MenuItemProps>) {
  const { className, children, onClick } = props;

  return (
    <li className={classNames("menu-item", "list-item", className, { clickable: onClick })} onClick={onClick}>
      {children}
    </li>
  );
}
