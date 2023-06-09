import type { ClassAndChildren } from "@sparrow/core";
import { classNames } from "@sparrow/theme";
import { Sidebar } from "../menu/sidebar";
import "./split-view.scss";

type SplitViewProps = {
  className?: string;
  sideContent: ClassAndChildren["children"];
  isSideVisible?: boolean;
};

export function SplitView(props: ClassAndChildren<SplitViewProps>) {
  const { className, children, isSideVisible, sideContent } = props;

  return (
    <div className={classNames("split-view", className, { "side-visible": isSideVisible })}>
      <Sidebar blur persistent isOpen={isSideVisible} overlay={false}>
        {sideContent}
      </Sidebar>

      <div className="content">{children}</div>
    </div>
  );
}
