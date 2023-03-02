import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import ItemLoad from "../../../load/itemLoad";

function ItemView(props) {
  const {
    selectItem,
    setSelectIem
  } = props;
  const [dataType, setDataType] = useState("")
  const [dataLoad, setDataLoad] = useState(false)
  const cancel = ()=>{ setSelectIem("")}
  const fetchPost = async () => { 
    await getDocs(collection(db, "dataTyps"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                newData.forEach(elem=>{
                  if(elem.id===selectItem.dataTypeId?.id){
                    setDataType(elem.typeName);
                    return;
                  }
                })
            setDataLoad(false)
        })
        .catch(err=>console.log(err))
}
  useEffect(()=>{
    fetchPost();
    console.log(dataType);
  })
  if(!selectItem) return  <></>
  return (
    <>
      <div className="itemView">
        <h3 className="t-center">{selectItem.name}</h3>
        <button className="cancel" onClick={cancel}>x</button>
        <ul>
          {
            dataLoad && <ItemLoad/>
          }
          <li className="typeFileView">
            <button className="btnDownload">Download</button>
            <div className="column">
              <span>Description</span>
              <p className="descrip">description</p>
            </div>
            <ul className="tags row wrap">
              <li>none</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ItemView;
