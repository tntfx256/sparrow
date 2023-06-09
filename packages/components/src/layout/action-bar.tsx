import type { ReactNode } from "react";
import { useMemo } from "react";
import type { Actionable, Actions, Any, ClassAndChildren, OnAction } from "@sparrow/core";
import { logger } from "@sparrow/core";
import type { BoxProps } from "./box";
import { Button } from "../button";
import { Toolbar } from "../menu";

type ActionBarProps<T extends string = string> = Actionable<T> & Pick<BoxProps, "justifyContent">;

export function ActionBar<T extends string = string>(props: ClassAndChildren<ActionBarProps<T>>) {
  const { className, children, actions, onAction, justifyContent = "flex-end" } = props;

  const alertActions = useMemo(() => {
    return actions ? getActions<T>(onAction, actions) : null;
  }, [actions, onAction]);

  if (alertActions || children) {
    return (
      <Toolbar className={className}>
        {children}
        {alertActions && <Toolbar.Section justifyContent={justifyContent}>{alertActions}</Toolbar.Section>}
      </Toolbar>
    );
  }

  return null;
}

export function getActions<T extends string = string>(handleClick?: OnAction<T>, actionSet?: Actions<T>): ReactNode[] {
  const handleAction = handleClick || ImplicitActionHandler;

  if (Array.isArray(actionSet)) {
    return actionSet.map((action) => (
      <Button
        key={action.id}
        endIcon={action.icon && action.iconPosition === "end" ? action.icon : undefined}
        startIcon={action.icon && action.iconPosition !== "end" ? action.icon : undefined}
        title={action.title}
        variant={action.variant || "default"}
        onClick={() => handleAction(action.id as Any)}
      />
    ));
  }

  switch (actionSet) {
    case "OkCancel":
      return [
        <Button
          key="cancel"
          shape="contained"
          title="Cancel"
          variant="secondary"
          onClick={() => handleAction("CANCEL" as Any)}
        />,
        <Button key="ok" shape="contained" title="Ok" variant="primary" onClick={() => handleAction("OK" as Any)} />,
      ];

    case "RetryCancel":
      return [
        <Button
          key="cancel"
          shape="contained"
          title="Cancel"
          variant="secondary"
          onClick={() => handleAction("CANCEL" as Any)}
        />,
        <Button
          key="retry"
          shape="contained"
          title="Retry"
          variant="primary"
          onClick={() => handleAction("RETRY" as Any)}
        />,
      ];
  }

  // OK
  return [<Button key="ok" shape="contained" title="Ok" variant="primary" onClick={() => handleAction("OK" as Any)} />];
}

function ImplicitActionHandler(action: string) {
  logger.warn(`No handler was provided for ${action}`);
}
