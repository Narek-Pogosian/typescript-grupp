import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import ThreadCard from "@/components/ThreadCard";
import { Thread } from "@/types";
import Loader from "@/utils/Loader/Loader";

const fetchThreads = async () => {
  const threadCollection = collection(db, "threads");
  const querySnapshot = await getDocs(threadCollection);

  const threads: Thread[] = [];
  querySnapshot.forEach((doc) => {
    threads.push(doc.data() as Thread);
  });

  return threads;
};

const Threads = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      )}
    </>
  );
};

export default Threads;
