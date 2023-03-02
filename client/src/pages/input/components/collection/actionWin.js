// import AddItemWin from './additemWin';
import { useState } from "react";
import ItemLoad from "../../../load/itemLoad";
import ItemView from "./itemView";
function ActionWin(props) {
  const {
    activeWin, 
    setActiveWin,
    openItemId,
    dataItems,
    setDataItems
  } = props;
  const [selectItem, setSelectIem] = useState("");
  const itemView = (item)=>{
    setSelectIem(item);
  }
  const deleteItem = ()=>{ }
  const addItemToCol = ()=>{ }
  return (
    <>
      {
        (activeWin.ActionWin)? <>
          <div className="actionWin">
             <ItemView
                selectItem={selectItem}
                setSelectIem={setSelectIem}
             />
            <h3 className="t-center">{openItemId.name}</h3>
            <button className="cancel" onClick={()=>{
              setActiveWin({...activeWin, ActionWin: false})
              setDataItems([]);
              }}>x</button>
            <div className="column">
              <button 
                className="addItemBtn" 
                onClick={()=>addItemToCol(openItemId.id)}
              >Add item to this collection</button>
            </div>
            <ul className="list">
              {
                (dataItems.length>0)?  (
                dataItems.map((item) => (
                  <li className="row between" key={item.id}>
                    <span className="itemName" onClick={() => itemView(item)}>
                        {item?.name?.length > 30
                          ? item.name.slice(0, 20) + "..."
                          : item.name}
                    </span>
                    <div className="actionBtn">
                      <button>edit</button>
                      <button 
                        className="btn-danger" 
                        onClick={() => deleteItem(item.id, item.name)}
                      >delet</button>
                    </div>
                  </li>
                ))):(
                    <ItemLoad/>
                )}
            </ul>
            <div className="colAction">
              <div className="row between">
                <span>Count: {dataItems.length}</span>
                <div className="row">
                  <button className="actionBtn">Delete collection</button>
                  <button className="actionBtn">Clear all</button>
                </div>
              </div>
            </div>
          </div>
        </>
        :<></>
      }
    </>
  );
}

export default ActionWin;