import { deleteDoc, doc } from "firebase/firestore";
import { Button } from "./ui/button";
import { db } from "@/firebase";
import { useState } from "react";
import { Thread, User } from "@/types";
import { useNavigate } from "react-router-dom";

type DeleteCommentButtonProps = {
  thread: Thread;
  user: User;
};

// With showdelete prop on ThreadCard, show only the button in the details page
const DeleteThreadButton = ({ thread, user }: DeleteCommentButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const deleteComment = () => {
    // Make sure the creator user can only delete
    if (!user || user.id !== thread.creator.id) return;

    setIsDeleting(true);

    deleteDoc(doc(db, "threads", thread.id))
      .then(() => {
        navigate("/");
      })
      .finally(() => setIsDeleting(false));
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={deleteComment}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting" : "Delete"}
    </Button>
  );
};

export default DeleteThreadButton;
