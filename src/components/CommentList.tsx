import { db } from "@/firebase";
import { Comment } from "@/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { FaUser } from "react-icons/fa";
import { useAuthContext } from "@/hooks/useAuthContext";
import DeleteCommentButton from "./DeleteCommentButton";

type CommentListProps = {
  threadId: string;
};

const CommentList = ({ threadId }: CommentListProps) => {
  const { user } = useAuthContext();
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
        <Card key={comment.id}>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <FaUser size={12} />
                <span className="text-sm font-semibold">
                  {comment.creator.userName}
                </span>
              </div>
              {/* Only show delete button to the user that created it*/}
              {user?.id === comment.creator.id && (
                <DeleteCommentButton comment={comment} />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{comment.content}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;
