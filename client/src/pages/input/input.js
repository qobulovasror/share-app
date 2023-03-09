import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import {db} from '../../firebase/firebase';
import Header from "./components/header";
import Collection from "./components/collection/collection";
import './assets/input.css';

function Input({setAuthToken}) {
    const [userData, setUserData] = useState({});
    const [dataCols, setDataCols] = useState([]);
    const [dataLoad, setDataLoad] = useState(true);
    const [activeWin, setActiveWin] = useState({
      // AddColl: false,
      // ActionWin: false,
      AddItemWin: false,
      EditItem: false,
    });
    const AddItem = ()=>{ setActiveWin({...activeWin, AddItemWin: true}) }
    const fetchPost = async () => {
      await getDocs(collection(db, "dataItems"))
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
            userData={userData}
            />
        </div>
      </div>
      
    </>
  );
}

export default Input;