import { useState } from "react";
import Header from "./components/header";
import AddColl from "./components/addColl";
import ActionWin from "./components/actionWin";
import AddItemWin from "./components/additemWin";
import ViewKey from "./components/viewKey";

import './assets/input.css';

function Input() {
    const [collection, setCollection] = useState([
        { id: 1, name: "item", count: 5, createDate: "10.12.2022" },
        { id: 2, name: "item 2", count: 10, createDate: "10.12.2022" },
        { id: 3, name: "item 3", count: 5, createDate: "10.12.2022" }
    ]);
    const [activeWin, setActiveWin] = useState({
      AddColl: false,
      ActionWin: false,
      AddItemWin: false,
      ViewKey: false,
    });
    const createCollView = ()=>{
      setActiveWin({...activeWin, AddColl: true})
    }
    const clearCollection = ()=>{
        if (collection.length===0) return;
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Clear All ?"))
            setCollection([]);
    }
    const deleteItem = (id)=>{
      //edit backend request code
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Delete is selected item ?")){
          let coll = collection;
          coll.splice(id, 1);
          setCollection(coll);
        }
    }
    const collecView = (id)=>{
      setActiveWin({...activeWin, ActionWin: true})
    }
  return (
    <>
      <Header/>
      <AddColl 
        activeWin={activeWin} 
        setActiveWin={setActiveWin}
        collection={collection}
        setCollection={setCollection}  
      />
      <div className="card get">
        <h2 className="t-center">Your Collections</h2>
        <div className="add">
          <div className="t-center" onClick={createCollView}>
            Create collection
          </div>
        </div>
        <ul className="selectType row">
            {/* edit li to input radio */}
          <li className="active">All</li>
          <li>link</li>
          <li>file</li>
          <li>text</li>
        </ul>
        <ul className="list column">
            {
                (collection.length>0)?
                collection.sort((a, b)=> (a.id < b.id)? 1: -1)
                .map((item, index)=>(
                    <li className="row between" key={item.id} >
                        <div className="column" onClick={()=>collecView(item.id)}>
                            <span className="itemName">{(item.name.length>20)? item.name.slice(0, 20)+ '...': item.name}</span>
                            <p className="createDate">{item.createDate}</p>
                        </div>
                        <div className="actionBtn">
                          <span>count: {item.count} </span>
                          <button>add</button>
                          <button>edit</button>
                          <button
                            onClick={()=>deleteItem(index)}
                          >delet</button>
                        </div>
                    </li>
                )):
                <li className="t-center">Empty</li>
            }
        </ul>
        <div className="colAction">
          <div className="row between">
            <span>Count: {collection.length}</span>
            <button className="actionBtn" onClick={clearCollection} >Clear all</button>
          </div>
        </div>
      </div>

      <ActionWin 
        activeWin={activeWin} 
        setActiveWin={setActiveWin}
      />
      <AddItemWin/>
      <ViewKey/>
    </>
  );
}

export default Input;