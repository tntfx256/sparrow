import type { PropsWithChildren, ReactElement } from "react";
import type { Any } from "@sparrow/core";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";

const AllTheProviders = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) =>
  render(ui as Any, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
