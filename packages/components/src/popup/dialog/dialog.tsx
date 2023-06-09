import { useCallback, useState } from "react";
import type { Container } from "@sparrow/core";
import { calcInitialFrameDimension, generateId } from "@sparrow/core";
import { classNames } from "@sparrow/theme";
import { Backdrop } from "../../backdrop";
import { ActionBar } from "../../layout/action-bar";
import { Frame } from "../../layout/frame";
import type { FrameEvent } from "../../layout/frame/utils";
import { getCloseAction } from "../../utils";
import type { DialogProps } from "../types";
import "./dialog.scss";

export function Dialog(props: DialogProps) {
  const {
    id,
    isOpen,
    className,
    actions,
    persistent,
    onAction,
    onClose,
    global = true,
    background = "default",
    type,
    boundary,
    ...frameProps
  } = props;

  const [container, setContainer] = useState(() => {
    // const id = generateId();

    const container: Container = {
      id,
      dimension: calcInitialFrameDimension([]),
      entity: { id, icon: "apps", name: "dialog", path: "/", type: "App" },
      state: "active",
      status: "normal",
    };

    return container;
  });
  const closeAction = getCloseAction(actions);

  const handleChange = useCallback((event: FrameEvent) => {
    const { type, id } = event;
    switch (type) {
      case "close":
        if (onAction && closeAction) {
          onAction(closeAction);
        } else {
          onClose?.();
        }
    }
  }, []);

  return (
    <Backdrop
      animation="zoom"
      background={background}
      className={classNames("dialog-backdrop", { [`${className}-dialog-backdrop`]: className })}
      global={global}
      isOpen={isOpen}
      persistent={persistent}
    >
      <Frame
        className={classNames("dialog", className)}
        footerSlot={actions || onAction ? <ActionBar actions={actions} onAction={onAction} /> : undefined}
        {...frameProps}
        {...container}
        isDialog
        onChange={handleChange}
      />
    </Backdrop>
  );
}
