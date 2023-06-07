import { isClient, LocalStorage, MemoryStorage } from "@sparrow/core";

export const storage = isClient() ? new LocalStorage() : new MemoryStorage();
