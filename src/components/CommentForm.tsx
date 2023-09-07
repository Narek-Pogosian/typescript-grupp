import { useAuthContext } from "@/hooks/useAuthContext";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useRef } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Comment } from "@/types";
import { useState } from "react";
import BtnLoader from "@/utils/Loader/BtnLoader";

type CommentFormProps = {
  threadId: string;
};

const CommentForm = ({ threadId }: CommentFormProps) => {
  const { user } = useAuthContext();
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;
    if (!contentRef.current) return;

    const content = contentRef.current.value;
    if (!content.trim()) return;

    try {
      setIsLoading(true);
      const id = crypto.randomUUID();
      const newComment: Comment = {
        id,
        content,
        creator: {
          id: user.id,
          userName: user.userName,
        },
        threadId,
      };

      await setDoc(doc(db, "comments", id), newComment);
      contentRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <form
      className="flex flex-col gap-4 pt-6 mt-6 border-t"
      onSubmit={handleSubmit}
    >
      <Textarea
        placeholder="Add new comment"
        rows={4}
        ref={contentRef}
        name="comment"
      />
      <Button type="submit" className="self-end" disabled={!user || isLoading}>
        {isLoading && <BtnLoader />}
        Submit
      </Button>
    </form>
  );
};

export default CommentForm;
