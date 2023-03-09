import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../../firebase/firebase";
import { useState } from "react";
import ItemLoad from "../../../load/itemLoad";
import AddItemWin from "./additemWin";
import EditItem from "./editItem";

function Collection(props) {
  const { dataCols, setActiveWin, activeWin, dataLoad, fetchPost, userData } = props;
  const [itemId, setItemId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [check, setCheck] = useState(true);
  const checkedHandler = (e)=>{ 
    if(e.target.id!=='all')
      setCheck(false);
      else
      setCheck(true);
    setFilter(e.target.id)
   }
  const deleteItem = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Delete is "${name}" item ?`)) {
      await deleteDoc(doc(db, "dataItems", id))
        .then((res) => toast.success("delete success !"))
        .catch((err) => toast.error(err))
        .finally(() => {
          fetchPost();
        });
    }
  };
  const OpenItemView = (item) => {
    setActiveWin({...activeWin, EditItem: true});
    setItemId(item);
  };
  const clearCollection = () => {
    if (dataCols.length === 0) return;
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Clear All ?")) {
      for (let i = 0; i < dataCols.length; i++) {
        // eslint-disable-next-line no-unused-expressions
        deleteItem(dataCols[i].id, dataCols[i].name);
      }
    }
  }
  return (
    <>
      <AddItemWin
        setActiveWin={setActiveWin}
        activeWin={activeWin}
        fetchPost={fetchPost} 
        userData={userData}
      />
      <EditItem
        setActiveWin={setActiveWin}
        activeWin={activeWin}
        itemId={itemId}
        setItemId={setItemId}
        fetchPost={fetchPost}
      />
      <ul className="selectType row">
        <li className="active">
          <input type="radio" name="filterType" id="all" checked={check} onChange={checkedHandler} />
          <label htmlFor="all">All</label>
        </li>
        <li>
          <input type="radio" name="filterType" id="link" onChange={checkedHandler} />
          <label htmlFor="link">link</label>
        </li>
        <li>
          <input type="radio" name="filterType" id="file" onChange={checkedHandler} />
          <label htmlFor="file">file</label>
        </li>
        <li>
          <input type="radio" name="filterType" id="text" onChange={checkedHandler} />
          <label htmlFor="text">text</label>
        </li>
      </ul>
      <ul className="list column">
        {dataLoad && <ItemLoad/>}
        {dataLoad || dataCols.length > 0 ? (
          dataCols.filter((item)=>{
            if(filter==='all') return true;
            return item.dataType.type===filter
          }).map((item) => (
            <li className="row between" key={item.id}>
              <div
                className="column"
                onClick={() => OpenItemView(item)}
              >
                <span className="itemName">
                  {item?.name?.length > 30
                    ? item.name.slice(0, 20) + "..."
                    : item.name}
                </span>
              </div>
              <div className="actionBtn">
                <button
                  className="btn-danger"
                  onClick={() => deleteItem(item.id, item.name)}
                >delet</button>
              </div>
            </li>
          ))
        ) : (
          <li className="t-center">Empty</li>
        )}
      </ul>
      <div className="colAction">
        <div className="row between">
          <span>Count: {
          dataCols.filter((item)=>{
            if(filter==='all') return true;
            return item.dataType.type===filter
          }).length}</span>
          <button className="actionBtn btn-dange" onClick={clearCollection}>
            Clear all
          </button>
        </div>
      </div>
    </>
  );
}

export default Collection;
