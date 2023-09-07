import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { QNAThread, Thread } from "@/types";
import ThreadCard from "@/components/ThreadCard";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";

const Details = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState<Thread | QNAThread>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getThread = async () => {
      if (threadId) {
        setIsLoading(true);
        const docRef = doc(db, "threads", threadId);
        const docSnap = await getDoc(docRef);
        setIsLoading(false);

        if (docSnap.exists()) {
          setThread(docSnap.data() as Thread);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    };

    getThread();
  }, []);

  if (!threadId || error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {thread ? (
        <div className="space-y-6">
          <ThreadCard thread={thread} showLink={false} showDelete />
          <CommentList threadId={thread.id} />
          <CommentForm threadId={threadId} />
        </div>
      ) : (
        <p>Error</p>
      )}
    </>
  );
};

export default Details;
