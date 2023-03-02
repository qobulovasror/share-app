import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import {db} from '../../firebase/firebase';
import Header from "./components/header";
import AddColl from "./components/addColl";
import Collection from "./components/collection/collection";

import './assets/input.css';

function Input({setAuthToken}) {
    const [userData, setUserData] = useState({});
    const [dataCols, setDataCols] = useState([]);
    const [dataLoad, setDataLoad] = useState(true);
    const [activeWin, setActiveWin] = useState({
      AddColl: false,
      ActionWin: false,
      AddItemWin: false,
      ViewKey: false,
    });
    const createCollView = ()=>{
      setActiveWin({...activeWin, AddColl: true})
    }
    const fetchPost = async () => {
      await getDocs(collection(db, "dataCols"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
                  setDataCols(newData); 
              setDataLoad(false)
          })
          .catch(err=>console.log(err))
  }
  useEffect(()=>{
      fetchPost();
  }, [])
  return (
    <>
      <Header 
        setAuthToken={setAuthToken}
        setUserData={setUserData}
        userData={userData}
      />
      <AddColl 
        activeWin={activeWin} 
        setActiveWin={setActiveWin}
        dataCols={dataCols}
        setDataCols={setDataCols} 
        fetchPost={fetchPost} 
        userData={userData}
      />
      <div className="card get">
        <h2 className="t-center">Your Collections</h2>
        <div className="add" onClick={createCollView}>
          <div className="t-center">
            Create collection
          </div>
        </div>
        <div>
          <Collection 
            dataCols={dataCols} 
            setDataCols={setDataCols}
            fetchPost={fetchPost}
            dataLoad={dataLoad}
            setActiveWin={setActiveWin}
            activeWin={activeWin}
            />
        </div>
      </div>
      
    </>
  );
}

export default Input;