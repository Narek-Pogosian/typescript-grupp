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
} from "@radix-ui/react-select";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { user } = useAuthContext();
  const initialState = {
    title: "",
    category: "",
    creationDate: "",
    description: "",
    creator: user?.userName,
  };
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  const handleNewPost = (e) => {
    e.preventDefault();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="THREAD">Thread</SelectItem>
                  <SelectItem value="QNA">QnA</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="text-md bg-blue-500 hover:bg-blue-400 p-5">
            Post
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Create;
