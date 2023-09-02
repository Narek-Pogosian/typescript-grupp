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
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Thread, ThreadCategory } from "@/types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

const Create = () => {
  const { user } = useAuthContext();
  const initialState: Thread = {
    id: "",
    title: "",
    category: "THREAD" || "QNA",
    creationDate: "",
    description: "",
    creator: {
      id: "",
      userName: "",
    },
  };
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, category, description } = formData;

    if (!title || !category || !description) {
      setError("Please fill in all fields");
      return;
    }
    if (title.length < 3) {
      setError("Title cannot be less than 3 characters");
      return;
    }
    try {
      if (category === "QNA") {
        addDoc(collection(db, "threads"), {
          title,
          category,
          description,
          creator: {
            id: user?.id,
            userName: user?.userName,
          },
          isAnswered: false,
        });
      } else {
        addDoc(collection(db, "threads"), {
          title,
          category,
          description,
          creator: {
            id: user?.id,
            userName: user?.userName,
          },
        });
      }
      setFormData(initialState);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Failed to add post, try again later");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (e.target.id === "category") {
      setFormData((data) => {
        return {
          ...data,
          category: e.target.value as ThreadCategory,
        };
      });
    } else {
      setFormData((data) => {
        return {
          ...data,
          [e.target.id]: e.target.value,
        };
      });
    }
  };
  console.log(formData);

  return (
    <section className="min-h-full bg-purple-400">
      <div className="w-[35rem] mx-auto flex flex-col gap-5">
        <form
          className="flex flex-col gap-5 bg-white p-10 rounded mt-24"
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
              rows={13}
              className=" resize-none"
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <div className="">
            <Select
              onValueChange={(value) =>
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
          </div>
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
