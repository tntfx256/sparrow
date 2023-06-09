import type { Actionable, Boundary, ClassAndChildren, IconName, MessageType, Second } from "@sparrow/core";
import type { BackdropProps } from "../backdrop";

export type PopupType = "dialog" | "toast"; // "Notification"

interface CommonPopupProps extends ClassAndChildren, Actionable {
  id: string;
  title?: string;
  isOpen?: boolean;
  icon?: IconName;
  type?: MessageType;
  onClose?: () => void;
}

export interface ToastProps extends CommonPopupProps {
  timeout?: Second;
}
export interface ToastPayload extends ToastProps {
  id: string;
  description?: string;
}

export interface DialogProps extends CommonPopupProps {
  global?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  persistent?: boolean;
  isBlocking?: boolean;
  background?: BackdropProps["background"];
  boundary?: Boundary;
}
export interface DialogPayload extends DialogProps {
  id: string;
}
