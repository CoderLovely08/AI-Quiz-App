import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { useAuth } from "../Authentication/AuthContext";
import { ShowDialog } from "./ShowDialog";
import { useSnackbar } from "notistack";
import Button from "./Button";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const auth = getAuth(app);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Logout handler
  const handleLogoutUser = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoutClick = async () => {
    await signOut(auth);
    logout();
    setOpen(false);
    enqueueSnackbar("Logout Successful", {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  return (
    <div>
      <ShowDialog
        open={open}
        handleClose={handleClose}
        handleSubmitTest={handleLogoutClick}
        message="Are you sure you want to logout?"
      />
      <nav className="bg-white p-2 shadow-md rounded-b-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-teal-500 text-2xl font-bold">
            Aivatar
          </Link>
          <div className="flex items-center gap-1">
            <Link
              to="https://aivatarg3.vercel.app/"
              className="text-white"
            >
              {/* <h1 className="text-teal-500 text-xl font-bold">AIVATAR</h1> */}
            </Link>
            {!isLoggedIn ? (
              <div className="flex gap-1">
                <Link to="/login" className="text-white">
                  <Button label={"Login"} />
                </Link>
                <Link to="/register" className="text-white">
                  <Button label={"Register"} variant={"contained"} />
                </Link>
              </div>
            ) : (
              <>
                <span className="text-teal-500 bg-white px-2 py-1 border border-teal-500 rounded mx-2">{user?.userName}</span>
                <button
                  onClick={handleLogoutUser}
                  className="bg-white text-teal-500 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
