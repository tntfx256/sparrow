import type { ReactNode } from "react";
import { useEffect } from "react";
import type { Boundary, ClassAndChildren, Container, IconName } from "@sparrow/core";
import { useRefState, useToggle } from "@sparrow/hooks";
import { classNames } from "@sparrow/theme";
import { useFrameDimensions } from "./use-frame-dimensions";
import { useFrameDrag } from "./use-frame-drag";
import { useFrameResize } from "./use-frame-resize";
import type { FrameEvent } from "./utils";
import { Icon } from "../../icon";
import { Sidebar } from "../../menu/sidebar";
import { Toolbar } from "../../menu/toolbar";
import { DialogProvider } from "../../popup/dialog/dialog-context";
import { Text } from "../../typography";
import { Box } from "../box";
import "./frame.scss";

export interface FrameProps extends ClassAndChildren, Omit<Container, "entity"> {
  isSidebarOpen?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  title?: string;
  icon?: IconName;
  boundary?: Boundary;
  isDialog?: boolean;
  // slots
  headerSlot?: ReactNode;
  titlebarSlot?: ReactNode;
  sidebarSlot?: ReactNode;
  footerSlot?: ReactNode;
  //
  onChange: (event: FrameEvent) => void;
}

export function Frame(props: FrameProps) {
  const {
    id,
    draggable,
    resizable,
    headerSlot,
    titlebarSlot,
    title,
    icon,
    footerSlot,
    sidebarSlot,
    className,
    children,
    isSidebarOpen,
    state,
    status,
    boundary,
    dimension,
    isDialog,
    onChange,
  } = props;

  const [initiated, setInitiated] = useToggle();
  const [frame, frameRefHandler] = useRefState<HTMLDivElement>();

  useFrameDrag({ id, draggable, status, frameElement: frame, boundary, isDialog, onChange });
  useFrameResize({ id, resizable, status, frameElement: frame, boundary, isDialog, onChange });
  const { headerHeight, footerHeight } = useFrameDimensions(frame);

  useEffect(() => {
    if (frame && !initiated) {
      const dimension = frame.getBoundingClientRect();
      onChange({ id, type: "init", dimension });
      setInitiated();
    }
  }, [frame, initiated]);

  return (
    <Box
      className={classNames("frame", `status-${status}`, className, { _active: state === "active", _initiated: initiated })}
      draggable={draggable}
      id={id}
      ref={frameRefHandler}
      resizable={resizable}
      style={initiated ? dimension : undefined}
    >
      <DialogProvider>
        <Box className="frame-wrapper">
          <Box className="frame-content">
            <Box className={classNames("frame-body", [className, "-body"])}>
              <div
                className="frame-header-placeholder"
                style={{ height: headerHeight, minHeight: headerHeight, maxHeight: headerHeight }}
              />
              {children}
              <div
                className="frame-footer-placeholder"
                style={{ height: footerHeight, minHeight: footerHeight, maxHeight: footerHeight }}
              />
            </Box>

            <Box className={classNames("frame-header", [className, "-header"])}>
              <Toolbar>
                <Toolbar.Title>
                  {!!sidebarSlot ? (
                    <Icon
                      name="sidebar"
                      // onClick={toggleSidebar}
                    />
                  ) : (
                    <Icon name={icon || "apps"} />
                  )}
                  {title && <Text size="large">{title}</Text>}
                </Toolbar.Title>

                <Toolbar.Section>{titlebarSlot}</Toolbar.Section>

                <Toolbar.Control>
                  {!isDialog && (
                    <>
                      <Icon name="minimize" onClick={() => onChange({ id, type: "minimize" })} />

                      <Icon
                        name={status === "maximized" ? "restoreMaximize" : "maximize"}
                        onClick={() => onChange({ id, type: status === "maximized" ? "restore" : "maximize" })}
                      />
                    </>
                  )}

                  <Icon name="cross" onClick={() => onChange({ id, type: "close" })} />
                </Toolbar.Control>
              </Toolbar>
              {headerSlot}
            </Box>

            {footerSlot && <Box className={classNames("frame-footer", [className, "-footer"])}>{footerSlot}</Box>}
          </Box>
          {sidebarSlot && (
            <Sidebar className={classNames("frame-sidebar", [className, "-sidebar"])} isOpen={isSidebarOpen} overlay={false}>
              <div
                className="frame-sidebar-placeholder"
                style={{ height: headerHeight, minHeight: headerHeight, maxHeight: headerHeight }}
              />
              {sidebarSlot}
            </Sidebar>
          )}
        </Box>
      </DialogProvider>
    </Box>
  );
}
