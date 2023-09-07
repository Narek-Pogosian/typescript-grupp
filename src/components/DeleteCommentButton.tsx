import { deleteDoc, doc } from "firebase/firestore";
import { Button } from "./ui/button";
import { db } from "@/firebase";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Comment } from "@/types";

type DeleteCommentButtonProps = {
  comment: Comment;
};

const DeleteCommentButton = ({ comment }: DeleteCommentButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuthContext();

  const deleteComment = () => {
    // Make sure the creator user can only delete
    if (!user || user.id !== comment.creator.id) return;

    setIsDeleting(true);

    deleteDoc(doc(db, "comments", comment.id)).finally(() =>
      setIsDeleting(false)
    );
  };

  return (
    <Button variant="destructive" size="sm" onClick={deleteComment}>
      {isDeleting ? "Deleting" : "Delete"}
    </Button>
  );
};

export default DeleteCommentButton;
