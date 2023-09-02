import { auth } from "@/firebase";
import { useAuthContext } from "@/hooks/useAuthContext";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";

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
      <header className="h-[3rem] fixed top-0 left-0 w-full bg-purple-950">
        <div className="container flex items-center justify-between h-full">
          <NavLink
            to="/"
            className="text-xl font-semibold text-white uppercase"
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
    </>
  );
};

export default Header;
