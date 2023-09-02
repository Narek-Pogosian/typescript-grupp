import { Route, Routes } from "react-router-dom";
import Threads from "./pages/Threads";
import Details from "./pages/Details";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";

const App = () => {
  return (
    <Routes>
      <Route element={<Header/>}>
        <Route index element={<Threads />} />
        <Route path="/:threadId" element={<Details />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
