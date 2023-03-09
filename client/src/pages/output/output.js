import { useState } from "react";
import Header from "./components/header";
import Result from "./components/result";
import Search from "./components/search/search";
import "./assets/style.css";
import ItemLoad from "../load/itemLoad";
import ViewKey from "./components/viewKey";
import ItemView from "./components/itemView/itemView";
function Output() {
  const [result, setResult] = useState([]);
  const [load, setLoad] = useState(false)
  const [search, setSearch] = useState({
    text: "",
    type: "all",
    userEmail: "",
    tags: []
  });
  const [selItem, setSelIem] = useState("")
  const [activeWin, setActiveWin] = useState({
    ViewKey: false,
    ViewItem: false
  })
  const itemViewHandler = (item)=>{
    setSelIem(item)
    if(item.key)
      setActiveWin({...activeWin, ViewKey: true})
    else
      setActiveWin({ ...activeWin, ViewItem: true })
  }
  return (
    <>
      <div className="card output">
        <Header />
        <ViewKey
          activeWin={activeWin}
          setActiveWin={setActiveWin}
          selItem={selItem}
          setSelIem={setSelIem}
        />
        <ItemView
          selItem={selItem}
          activeWin={activeWin}
          setActiveWin={setActiveWin}
        />
        <Search 
          setResult={setResult}
          setSearch={setSearch} 
          search={search}
          setLoad={setLoad}/>
        <ul className="result">
          {
            (result.length) ? 
              result.map((item) => (
                <Result 
                  key={item.id}
                  item={item}
                  itemViewHandler={itemViewHandler} 
                />)) : 
              (load)?  <ItemLoad/>: 
              <li className="t-center">No data</li>
          }
        </ul>
      </div>
    </>
  );
}

export default Output;
