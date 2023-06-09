import type { ReactNode } from "react";
import type { Any, ClassAndChildren } from "@sparrow/core";
import { classNames } from "@sparrow/theme";
import type { Column, TableCellProps } from "./types";

export function TableCell(props: ClassAndChildren<TableCellProps>) {
  const { header, selected, children, className, align, vAlign, colSpan } = props;

  const attributes = {
    className: classNames("table-cell", className, { _header: header, _selected: selected }),
    style: { verticalAlign: vAlign, textAlign: align },
    colSpan,
  };

  return header ? <th {...attributes}>{children}</th> : <td {...attributes}>{children}</td>;
}

TableCell.getHeaderTitle = function getHeaderTitle<T = Any>(column: Column<T>): ReactNode {
  if (column.renderHeaderCell) {
    return column.renderHeaderCell();
  }

  if ("title" in column) {
    return column.title || "";
  }

  return column.name;
};
