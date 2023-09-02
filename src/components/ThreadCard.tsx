import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Thread } from "@/types";
import { FaUser } from "react-icons/fa";

const ThreadCard = ({ thread }: { thread: Thread }) => {
  return (
    <Card
      className={`max-w-[40rem] border-b-4 ${
        thread.category === "QNA" ? "border-b-blue-500" : "border-b-red-500"
      }`}
    >
      <CardHeader className="">
        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-sm">
            <FaUser size={12} />
            {thread.creator.userName}
          </span>
          <span className="text-sm">Created at {thread.creationDate}</span>
        </div>
        <CardTitle>{thread.title}</CardTitle>
        <CardDescription>{thread.category}</CardDescription>
      </CardHeader>
      <CardContent>{thread.description}</CardContent>
    </Card>
  );
};

export default ThreadCard;
