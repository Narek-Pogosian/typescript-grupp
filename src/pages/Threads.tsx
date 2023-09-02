import { useAuthContext } from "@/hooks/useAuthContext";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useEffect } from "react";

const Threads = () => {
  const { user, setUser } = useAuthContext();
  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user) {
      const userData = JSON.parse(user);
      setUser(userData);
    }
  }, []);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userData");
        setUser(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <h1>Threads</h1>
      {user ? <span>{user.userName}</span> : "No user"}
      <nav className="flex gap-6">
        {!user && <Link to="/register">Register</Link>}
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <span className="cursor-pointer" onClick={signOutUser}>
            Logout
          </span>
        )}
        <Link to="/create">Create</Link>
      </nav>
    </div>
  );
};

export default Threads;
