import { useAuthContext } from "@/hooks/useAuthContext";
import { Link } from "react-router-dom";

const Threads = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <h1>Threads</h1>
      {user ? user.userName : "No user"}
      <nav className="flex gap-6">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/create">Create</Link>
      </nav>
    </div>
  );
};

export default Threads;
