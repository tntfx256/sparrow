import type { Action, Actions, Nullable } from "@sparrow/core";

export function getCloseAction(actions?: Actions): Nullable<Action> {
  if (actions === "OkCancel" || actions === "RetryCancel") return "Cancel";
  if (actions === "Ok") return "Ok";

  return null;
}
