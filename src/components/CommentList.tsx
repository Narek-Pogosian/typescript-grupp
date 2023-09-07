import { db } from "@/firebase";
import { Comment } from "@/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

type CommentListProps = {
  threadId: string;
};

const CommentList = ({ threadId }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("threadId", "==", threadId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments: Comment[] = [];
      querySnapshot.forEach((doc) => {
        comments.push(doc.data() as Comment);
      });

      setComments(comments);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default CommentList;
