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
    <div className="w-[100vw]">
      <Card
        className={`w-[40rem] mx-auto my-5 border-b-4 ${
          thread.category === "QNA" ? "border-b-blue-500" : "border-b-red-500"
        }`}
      >
        <CardHeader className="">
          <div className="flex justify-between">
            <span className="text-sm flex gap-1 items-center">
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
    </div>
  );
};

export default ThreadCard;
