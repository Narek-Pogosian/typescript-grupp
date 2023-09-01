export interface User {
  id: string;
  name: string;
  userName: string;
}

export interface Authentication extends User {
  email: string;
  password: string;
}

export type ThreadCategory = "THREAD" | "QNA";

export interface Thread {
  id: number;
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
  id: number;
  thread: number;
  content: string;
  creator: User;
}
