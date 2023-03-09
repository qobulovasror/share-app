import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function ViewKey(props) {
  const { activeWin, setActiveWin, selItem, setSelIem } = props; 
  const [key, setKey] = useState("");
  const [invalid, setInvalid] = useState('')
  const handlerEnter = (e)=>{
    if(e!=='Enter') return
    if(key===selItem.key){
        setActiveWin({ ...activeWin,  ViewKey: false, ViewItem: true })
        setKey("")
    }else{
      toast.warn("this key is incorrect 😟");
      setInvalid("invalid")
    }
  } 
  const cancelWin = ()=>{
    setKey("")
    setSelIem("")
    setActiveWin({...activeWin, ViewKey: false})
  }
  if(!activeWin.ViewKey) return <></>
 return (
    <>
        <ToastContainer/>
        <div className="viewKey">
            <h3 className="t-center">Enter Key</h3>
            <button className="cancel" onClick={cancelWin}>x</button>
            <input 
                className={invalid}
                type="text" 
                placeholder="key"
                onKeyDown={(e)=>handlerEnter(e.key)}
                onChange={(e)=>{
                    setKey(e.target.value)
                    setInvalid("")
                }}
                value={key}
            />
        </div>
    </>
  );
}

export default ViewKey;
