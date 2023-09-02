import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QNAThread, Thread, ThreadCategory } from "@/types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

type FormStateType = Pick<Thread, "title" | "category" | "description">;

const initialState: FormStateType = {
  title: "",
  category: "THREAD",
  description: "",
};

const Create = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialState);

  const handleNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, category, description } = formData;

    if (!user) {
      setError("Unauthorized");
      return;
    }

    if (!title || !category || !description) {
      setError("Please fill in all fields");
      return;
    }

    if (title.length < 3) {
      setError("Title cannot be less than 3 characters");
      return;
    }

    try {
      const currentDate = new Date().toLocaleDateString();
      const id = crypto.randomUUID();

      if (category === "QNA") {
        const newThread: QNAThread = {
          id,
          title,
          category,
          description,
          creator: {
            id: user.id,
            userName: user.userName,
          },
          creationDate: currentDate,
          isAnswered: false,
        };

        await setDoc(doc(db, "threads", id), newThread);
      } else {
        const newThread: Thread = {
          id,
          title,
          category,
          description,
          creator: {
            id: user.id,
            userName: user.userName,
          },
          creationDate: currentDate,
        };

        await setDoc(doc(db, "threads", id), newThread);
      }

      navigate("/");
    } catch (error) {
      setError("Failed to add post, try again later");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <section className="min-h-[calc(100vh-3rem)] bg-purple-400">
      <div className="w-[35rem] mx-auto flex flex-col gap-5">
        <form
          className="flex flex-col gap-5 p-10 mt-24 bg-white rounded"
          onSubmit={handleNewPost}
        >
          <h1 className="text-3xl font-semibold text-center">New Thread</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              value={formData.title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <Textarea
              name="description"
              id="description"
              rows={8}
              className="resize-none "
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <Select
            onValueChange={(value: ThreadCategory) =>
              setFormData((data) => ({ ...data, category: value }))
            }
            defaultValue={formData.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem id="THREAD" value="THREAD">
                  Thread
                </SelectItem>
                <SelectItem id="QNA" value="QNA">
                  QnA
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            className={`text-md bg-blue-500 hover:bg-blue-400 p-5 ${
              error && "shake"
            }`}
          >
            Post
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Create;
