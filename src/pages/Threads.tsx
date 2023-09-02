import { useAuthContext } from "@/hooks/useAuthContext";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import ThreadCard from "@/components/ThreadCard";
import { Thread } from "@/types";
import Loader from "@/utils/Loader/Loader";

const Threads = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const fetchThreads = async () => {
    const threadCollection = collection(db, "threads");
    const querySnapshot = await getDocs(threadCollection);

    const threads: Thread[] = [];
    querySnapshot.forEach((doc) => {
      threads.push({ id: doc.id, ...doc.data() });
    });

    return threads;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const threads = await fetchThreads();
        setThreads(threads);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(threads);
  return (
    <div className="min-h-[calc(100vh-3rem)]">
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
      <div className="w-[60rem]">
        {isLoading && (
          <div className="w-[100vw] h-[70vh] flex justify-center items-center">
            <Loader />
          </div>
        )}
        {threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
};

export default Threads;
