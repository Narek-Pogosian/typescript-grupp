import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { Authentication } from "@/types";
import { v4 as uuidv4 } from "uuid";
import BtnLoader from "@/utils/Loader/BtnLoader";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const intialState: Authentication = {
    id: uuidv4(),
    name: "",
    userName: "",
    email: "",
    password: "",
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Authentication>(intialState);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, name } = formData;
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: name });
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMsg = error.message;
        console.log(errorMsg);
      });
  };
  return (
    <section className="w-screen h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300">
      <div className="w-[27rem] mx-auto flex flex-col gap-10 pt-20">
        <form
          className="flex flex-col gap-2 p-10 bg-white rounded opacity"
          onSubmit={handleNewUser}
        >
          <h1 className="text-3xl text-center py-10 font-bold">Sign Up</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Username</label>
            <Input
              type="name"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="p-[1.3rem] border-slate-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="p-[1.3rem] border-slate-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="p-[1.3rem] border-slate-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Cpassword">Confirm Password</label>
            <Input
              type="password"
              name="Cpassword"
              id="Cpassword"
              className="p-[1.3rem] border-slate-200"
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 mt-5 p-5"
          >
            {isLoading && <BtnLoader />}
            Register
          </Button>
          <p className="mt-10 text-gray-400 text-center">
            Already a member?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
