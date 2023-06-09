import type { ReactNode } from "react";
import type { ClassAndChildren, Option } from "@sparrow/core";
import { classNames } from "@sparrow/theme";
import { ListItem } from "./list-item";
import { MenuItem } from "./menu-item";
import { Text } from "../typography/text";

type ListProps<T> = {
  title?: string;
  items?: T[];
  render?: (item: T, index: number) => ReactNode;
};

export function List<T = Option>(props: ClassAndChildren<ListProps<T>>) {
  const { title, className, render, items, children } = props;

  return (
    <section className={classNames("list", className)}>
      {title && (
        <header className="list-header">
          <Text className="list-header-title" size="xLarge">
            {title}
          </Text>
        </header>
      )}
      <main className="list-body">
        <ul className="list-items">
          {items && render && items.map((item, index) => render(item, index))}
          {items && !render && (items as Option[]).map((item) => <MenuItem key={item.id} item={item} />)}
          {children}
        </ul>
      </main>
    </section>
  );
}

List.Item = ListItem;
