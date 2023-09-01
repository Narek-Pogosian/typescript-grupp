import { Route, Routes } from "react-router-dom";
import Threads from "./pages/Threads";
import Details from "./pages/Details";
import Create from "./pages/Create";

const App = () => {
  return (
    <Routes>
      <Route index element={<Threads />} />
      <Route path="/:threadId" element={<Details />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
};

export default App;
