import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QNAThread, Thread } from "@/types";
import { FaUser } from "react-icons/fa";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { isQNAThread } from "@/lib/utils";

type ThreadCardProps = {
  thread: Thread | QNAThread;
  showLink?: boolean;
};

const ThreadCard = ({ thread, showLink = true }: ThreadCardProps) => {
  return (
    <Card
      className={`border-b-4 ${
        isQNAThread(thread) ? "border-b-blue-500" : "border-b-red-500"
      }`}
    >
      <CardHeader>
        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-sm">
            <FaUser size={12} />
            {thread.creator.userName}
          </span>
          <span className="text-sm text-neutral-600">
            Created at {thread.creationDate}
          </span>
        </div>
        <CardTitle>{thread.title}</CardTitle>
        <CardDescription className="flex items-center gap-4">
          <span>{thread.category}</span>
          {isQNAThread(thread) && thread.isAnswered && (
            <span className="px-3 py-1 text-sm font-semibold text-white rounded bg-primary">
              Answered
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>{thread.description}</p>
        {showLink && (
          <Button asChild>
            <Link to={`/${thread.id}`} className="self-end">
              See More
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ThreadCard;
