export interface User {
  id: string;
  userName: string;
}

export type ThreadCategory = "THREAD" | "QNA";

export interface Thread {
  id: string;
  title: string;
  category: ThreadCategory;
  creationDate: string;
  description: string;
  creator: User;
}

export interface QNAThread extends Thread {
  category: "QNA";
  isAnswered: boolean;
  commentAnswerId?: number;
}

export interface Comment {
  id: string;
  threadId: string;
  content: string;
  creator: User;
}
