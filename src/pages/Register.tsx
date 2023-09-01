import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AuthError,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import BtnLoader from "@/utils/Loader/BtnLoader";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Register = () => {
  const intialState = {
    userName: "",
    email: "",
    password: "",
    Cpassword: "",
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState(intialState);
  const [error, setError] = useState<string | null>(null);


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

    const { email, password, userName, Cpassword } = formData;

    if (!email || !password || !userName || !Cpassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (Cpassword !== password) {
      setError("Passwords dont match");
      return;
    } else {
      setIsLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, { displayName: userName }).then(() => {
            navigate("/login");
          });
        })
        .catch((error: AuthError) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        setTimeout(() => {
          setError(false);
        }, 2000);
        });
    }

  };

  return (
    <section className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300">
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
              value={formData.userName}
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
              onChange={handleChange}
              value={formData.Cpassword}
              className="p-[1.3rem] border-slate-200"
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-400 mt-5 p-5 ${
              error && "shake"
            }`}
          >
            {isLoading && <BtnLoader />}
            Register
          </Button>
          <p className="mt-10 text-gray-400 text-center">
            Already a member?{" "}
            <Link to="/login" className="underline text-indigo-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
