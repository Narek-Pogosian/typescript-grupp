import { QNAThread, Thread } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isQNAThread(thread: Thread | QNAThread): thread is QNAThread {
  return (thread as QNAThread).category === "QNA";
}
