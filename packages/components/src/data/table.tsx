import { useRef, useState } from "react";
import type { ClassAndChildren, Nullable } from "@sparrow/core";
import { generateId } from "@sparrow/core";
import { classNames } from "@sparrow/theme";
import { TableBody } from "./table-body";
import { TableHeader } from "./table-header";
import { TablePagination } from "./table-pagination";
import { TableProvider } from "./table-provider";
import type { TableProps } from "./types";
import { Box } from "../layout/box";
import { Loader } from "../loader";
import { Text } from "../typography";
import "./table.scss";

export function Table<T>(props: ClassAndChildren<TableProps<T>>) {
  const { className, children, title, caption, ...values } = props;

  const tableRef = useRef<Nullable<HTMLTableElement>>(null);
  const [tableId] = useState(() => `table-${generateId()}`);

  return (
    <TableProvider {...values}>
      <Box className={classNames("table-wrapper", className)}>
        {title && <Text size="large">{title}</Text>}

        <Box className="table-container">
          <table className="table" id={tableId} ref={tableRef}>
            {children ?? (
              <>
                <TableHeader />
                <TableBody />
              </>
            )}
          </table>
        </Box>

        <TablePagination />

        {caption && (
          <caption>
            <Text size="xSmall">{caption}</Text>
          </caption>
        )}
        <Loader background="blur" visible={props.isLoading} />
      </Box>
    </TableProvider>
  );
}
