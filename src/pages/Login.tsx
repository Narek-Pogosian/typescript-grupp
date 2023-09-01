import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase";
import { useAuthContext } from "@/hooks/useAuthContext";
import BtnLoader from "@/utils/Loader/BtnLoader";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const intialState = {
    userName: "",
    email: "",
    password: "",
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState(intialState);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // ! We set a displayName at registration, usually it will work but it can fail thats why it can be null.
        setUser({ id: user.uid, userName: user.displayName! });

        navigate("/");
      })
      .catch((error: AuthError) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300">
      <div className="w-[27rem] mx-auto flex flex-col gap-10 pt-20">
        <form
          className="flex flex-col gap-2 p-10 bg-white rounded"
          onSubmit={handleLogin}
        >
          <h1 className="text-3xl text-center py-10 font-bold">Sign In</h1>
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
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 mt-5 p-5"
          >
            {isLoading && <BtnLoader />}Login
          </Button>
          <p className="mt-10 text-gray-400 text-center">
            Not a member?{" "}
            <Link to="/register" className="underline text-indigo-500">
              Sign up
            </Link>{" "}
            now
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
