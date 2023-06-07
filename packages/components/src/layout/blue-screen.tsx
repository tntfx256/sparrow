import type { CSSProperties } from "react";
import type { ERROR } from "@sparrow/core";
import { finalizeError } from "@sparrow/core";
import { Colors } from "@sparrow/theme";

/**
 * BlueScreen should not use any component
 */

export type BlueScreenProps = {
  error: ERROR;
};

export function BlueScreen(props: BlueScreenProps) {
  const { error: rawError } = props;

  const { name, message, description, originalName, code, stack, status } = finalizeError(rawError);

  return (
    <div style={wrapperStyle}>
      <h1 style={titleStyle}>:(</h1>

      <h2 style={subtitleStyle}>
        {name} <small>({originalName})</small>
      </h2>

      <p style={textStyle}>Code: {code}</p>
      <p style={textStyle}>Status: {status}</p>

      <p style={textStyle}>{message}</p>

      <p style={textStyle}>{description}</p>

      <pre style={{ whiteSpace: "pre-line", fontSize: "0.75rem", flex: 1, overflow: "auto" }}>{stack}</pre>
    </div>
  );
}

const wrapperStyle: CSSProperties = {
  display: "flex",
  position: "fixed",
  flexDirection: "column",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  alignItems: "flex-start",
  background: "#0070d5",
  color: Colors.White,
  justifyContent: "center",
  padding: "0 15%",
};

const titleStyle: CSSProperties = {
  fontSize: "4rem",
  fontWeight: "bold",
  margin: "1rem 0",
};

const subtitleStyle: CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "normal",
  margin: "2rem 0",
};

const textStyle: CSSProperties = {
  fontSize: "1rem",
  margin: "0.5rem 0",
};
