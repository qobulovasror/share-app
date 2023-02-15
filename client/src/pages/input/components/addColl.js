import { useState } from "react";

function AddColl(props) {
  const {
    collection,
    setCollection,
    activeWin,
    setActiveWin
  } = props;
  const [newColl, setNewColl] = useState('');
  const submitColl = ()=>{
    if(!newColl) return;
    setCollection([...collection, {id: collection.length+1, name: newColl.trim(), count: 0} ]);
    setNewColl("")
  }
  if (!activeWin.AddColl) 
    return <></>;
  
  return (
    <>
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
          <button
            onClick={submitColl} 
          >Create</button>
          <span className="inputMaxLeng">{newColl.length}/45</span>
        </div>
      </div>
    </>
  );
}

export default AddColl;
