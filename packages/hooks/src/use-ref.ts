import type { LegacyRef, RefCallback } from "react";
import { useCallback, useMemo, useState } from "react";
import type { Any, Nullable } from "@sparrow/core";

export function useRefState<T>(): [Nullable<T>, RefCallback<T>] {
  const [container, setContainer] = useState<Any>(null);

  const handleRef = useCallback((ref: LegacyRef<T>) => setContainer(ref), []);

  return useMemo(() => [container, handleRef as RefCallback<T>], [container, handleRef]);
}
