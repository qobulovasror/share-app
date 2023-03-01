import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Header({ setAuthToken, setUserData, userData }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        // toast.success("login succeeded 😊");
      } else {
        logout()
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    // eslint-disable-next-line no-restricted-globals
    if(confirm("Are you want log out? 🤨"))
      logout()
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        setAuthToken("")
        window.localStorage.setItem('authToken', "")
        navigate("/");
      })
      .catch((error) => {
        toast.error(error + "🙁");
      });
  };
  
  return (
    <>
      <ToastContainer />
      <div className="header set">
        <div className="container">
          <div className="row between">
            <Link to="/" className="logo">
              <i className="bx bxs-share-alt">Share</i>
            </Link>
            <div className="profil">
              {userData.email}
              <button onClick={handleLogout}>
                log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
