import { Comment } from "@/types";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { FaUser } from "react-icons/fa";
import DeleteCommentButton from "./DeleteCommentButton";
import { useAuthContext } from "@/hooks/useAuthContext";

type CommentCardProps = {
  comment: Comment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const { user } = useAuthContext();

  return (
    <Card key={comment.id}>
      <CardHeader>
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <FaUser size={12} />
            <span className="text-sm font-semibold">
              {comment.creator.userName}
            </span>
          </div>
          {/* Only show delete button to the user that created it*/}
          {user?.id === comment.creator.id && (
            <DeleteCommentButton comment={comment} user={user} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{comment.content}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
