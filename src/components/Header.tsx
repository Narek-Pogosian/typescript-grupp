import { auth } from "@/firebase";
import { useAuthContext } from "@/hooks/useAuthContext";
import { signOut } from "firebase/auth";
import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useAuthContext();

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
    <>
      <header className="h-[4rem] bg-purple-950">
        <div className="w-[80%] h-full mx-auto flex justify-between items-center">
          <NavLink
            to="/"
            className="text-white uppercase font-semibold text-xl"
          >
            threads
          </NavLink>
          <nav>
            <ul className="flex gap-10 text-white uppercase">
              <li>
                <NavLink to="/create">create</NavLink>
              </li>
              {!user && (
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              )}
              {!user ? (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              ) : (
                <li className="cursor-pointer" onClick={signOutUser}>
                  Logout
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
