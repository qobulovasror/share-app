import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
function ViewKey(props) {
  const {
    keyViewPass,
    viewItemWins,
    setViewItemWins,
  } = props; 
  const [key, setKey] = useState("");
  const handlerEnter = (e)=>{
    if(e!=='Enter') return
    if(key===keyViewPass){
      setViewItemWins({
        ...viewItemWins, 
        keyWin: false, 
        itemViewWin: false
      })
    }else{
      toast.warn("this key is incorrect 😟");
    }
  } 
  const cancelWin = ()=>{
    setViewItemWins({...viewItemWins, keyWin: false})
    setKey("")
  }
  if(!viewItemWins.keyWin) return <></>
 return (
    <div className="viewKey">
      <ToastContainer/>
      <h3 className="t-center">Enter Key</h3>
      <button className="cancel" onClick={cancelWin}>x</button>
      <input 
        type="text" 
        placeholder="key"
        onKeyDown={(e)=>handlerEnter(e.key)}
        onChange={(e)=>setKey(e.target.value)}
        value={key}
      />
    </div>
  );
}

export default ViewKey;
