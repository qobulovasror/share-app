import { useState, useEffect } from "react";
import AddFile from "./addItemType/addFile";
import AddLink from "./addItemType/addlink";
import AddText from "./addItemType/addText";

function AddItemWin(props) {
  const { setActiveWin, activeWin, fetchPost, email } = props;
  const [check, setCheck] = useState(true);
  const [type, setType] = useState("link")
  const checkedHandler = (e)=>{
      setType(e.target.id)
      if(e.target.id!=='link')
          setCheck(false);
      else
          setCheck(true);
  }
  useEffect(()=>{
      setCheck(true);
  }, []);
  if(!activeWin.AddItemWin) return <></>
  return (
    <>
      <div className="addItemWin ">
        <h3 className="headerName">Add an element</h3>
        <button className="cancel" onClick={()=>{setActiveWin({...activeWin, AddItemWin: false})}}>x</button>
        <div className="row">
          <h4>Select new item type</h4>
          <ul className="itemType row">
            <li>
              <input checked={check} type="radio" name="searchType" id="link" onChange={checkedHandler} />
              <label htmlFor="link">link</label>
            </li>
            <li>
              <input type="radio" name="searchType" id="text" onChange={checkedHandler} />
              <label htmlFor="text">text</label>
            </li>
            <li>
              <input type="radio" name="searchType" id="file" onChange={checkedHandler} />
              <label htmlFor="file">file</label>
            </li>
          </ul>
        </div>
        <ul className="itemBody">
          {
            (type==='file')? 
              <AddFile type={type}/> : 
                (type==='text')? 
                  <AddText 
                    type={type} 
                    setActiveWin={setActiveWin} 
                    activeWin={activeWin}
                    fetchPost={fetchPost}
                    email={email}
                  /> 
                  : 
                    <AddLink 
                      type={type} 
                      setActiveWin={setActiveWin} 
                      activeWin={activeWin}
                      fetchPost={fetchPost}
                      email={email}
                      />
          }
        </ul>
      </div>
    </>
  );
}

export default AddItemWin;
