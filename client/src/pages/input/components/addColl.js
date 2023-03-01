import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import {db} from '../../../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function AddColl(props) {
  const {
    fetchPost,
    activeWin,
    setActiveWin,
    userData
  } = props;
  const [newColl, setNewColl] = useState('');
  const submitColl = async()=>{
    if(!newColl) return;
    try {
      const docRef = await addDoc(collection(db, "dataCols"), {
        name: newColl.trim(), 
        count: 0,
        createDate: new Date(),
        owerId: userData.email
      });
      console.log(docRef.id);
      toast.success("Adding success 😄")
      setNewColl("");
      setActiveWin({...activeWin, AddColl: false})
      fetchPost()
    } catch (err) {
      toast.error(err+' 🙁')
    }
  }
   
  
  if (!activeWin.AddColl) 
    return <></>;
  
  return (
    <>
      <ToastContainer/>
      <div className="addWin">
        <h3 className="t-center">New Collection</h3>
        <button className="cancel" onClick={()=>setActiveWin({...activeWin, AddColl: false})}>x</button>
        <div className="column">
          <label htmlFor="collName">Name</label>
          <input 
            type="text" 
            placeholder="collection name" 
            id="collName" 
            maxLength={45}          
            value={newColl}
            onChange={e=>setNewColl(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter') submitColl() }}
            />
        </div>
        <div className="createBtn row between">
          <button onClick={submitColl} >Create</button>
          <span className="inputMaxLeng">{newColl.length}/45</span>
        </div>
      </div>
    </>
  );
}

export default AddColl;
