import type { PropsWithChildren } from "react";
import { initStore } from "@sparrow/hooks";
import { Dialog } from "./dialog";
import type { DialogPayload } from "../types";
import "./dialog-context.scss";

type DialogState = {
  dialogs: DialogPayload[];
};
const initialState: DialogState = {
  dialogs: [],
};
const { StoreProvider, useStore } = initStore<DialogState>({ name: "toast" });

export function DialogProvider(props: PropsWithChildren) {
  return (
    <StoreProvider {...initialState}>
      {props.children}
      <DialogContainer />
    </StoreProvider>
  );
}

const DialogContainer: React.FC<PropsWithChildren> = function ToastContainer() {
  const [{ dialogs }] = useStore();

  return (
    <div className="dialog-container">
      {dialogs.map((props) => (
        <Dialog key={props.id} {...props} />
      ))}
    </div>
  );
};

export { useStore };
