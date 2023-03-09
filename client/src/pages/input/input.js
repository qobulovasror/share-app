import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import {db} from '../../firebase/firebase';
import Header from "./components/header";
import Collection from "./components/collection/collection";
import './assets/input.css';

function Input({setAuthToken, email, setEmail}) {
    const [userData, setUserData] = useState("");
    const [dataCols, setDataCols] = useState([]);
    const [dataLoad, setDataLoad] = useState(true);
    const [activeWin, setActiveWin] = useState({
      // AddColl: false,
      // ActionWin: false, 
      AddItemWin: false,
      EditItem: false,
    });
    const navigate = useNavigate();
    const AddItem = ()=>{ setActiveWin({...activeWin, AddItemWin: true}) }
    const fetchPost = async () => {
      await getDocs(collection(db, "dataItems"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .filter((item)=>{
                    return email===item.data().owerId;
                  })
                  .map((doc) => ({...doc.data(), id:doc.id }));
              setDataCols(newData); 
              setDataLoad(false)
          })
          .catch(err=>console.log(err))
    }
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user.email);
      } else {
        signOut(auth)
        .then(() => {
          setAuthToken("")
          window.localStorage.setItem('authToken', "")
          setEmail("");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
      }
    });
    fetchPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Header 
        setAuthToken={setAuthToken}
        setUserData={setUserData}
        userData={userData}
      />
      <div className="card get">
        <h2 className="t-center">Your elements</h2>
        <div className="add" onClick={AddItem}>
          <div className="t-center">Add new element</div>
        </div>
        <div>
          <Collection 
            dataCols={dataCols} 
            setDataCols={setDataCols}
            fetchPost={fetchPost}
            dataLoad={dataLoad}
            setActiveWin={setActiveWin}
            activeWin={activeWin}
            email={email}
            />
        </div>
      </div>
      
    </>
  );
}

export default Input;