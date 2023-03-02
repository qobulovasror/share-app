import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../../firebase/firebase";
import { useState } from "react";
import ActionWin from "./actionWin";
import { collection, getDocs } from "firebase/firestore";
import ItemLoad from "../../../load/itemLoad";

function Collection(props) {
  const { dataCols, setActiveWin, activeWin, dataLoad, fetchPost } = props;
  const [dataItems, setDataItems] = useState([]);
  const [openItemId, setOpenItemId] = useState({ id: "", name: "" });
  const deleteItem = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Delete is "${name}" item ?`)) {
      await deleteDoc(doc(db, "dataCols", id))
        .then((res) => toast.success("delete success !"))
        .catch((err) => toast.error(err))
        .finally(() => {
          fetchPost();
        });
    }
  };
  const collecView = (id, name) => {
    setActiveWin({ ...activeWin, ActionWin: true });
    setOpenItemId({ id, name });
    fetchPostItems(id);
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
  };

  const fetchPostItems = async (id) => {
    await getDocs(collection(db, "dataItems"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const data = [];
        newData.forEach((element) => {
          if (element.dataColsId._key.path.segments[6] === id)
            data.push(element);
        });
        setDataItems(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ul className="selectType row">
        {/* edit li to input radio */}
        <li className="active">All</li>
        <li>link</li>
        <li>file</li>
        <li>text</li>
      </ul>
      <ul className="list column">
        {dataLoad && <ItemLoad/>}
        {dataLoad || dataCols.length > 0 ? (
          dataCols.map((item) => (
            <li className="row between" key={item.id}>
              <div
                className="column"
                onClick={() => collecView(item.id, item.name)}
              >
                <span className="itemName">
                  {item?.name?.length > 30
                    ? item.name.slice(0, 20) + "..."
                    : item.name}
                </span>
                {/* <p className="createDate">{item.createDate}</p> */}
              </div>
              <div className="actionBtn">
                <span>count: {item.count} </span>
                {/* <button>add</button> */}
                {/* <button>edit</button> */}
                <button
                  className="btn-danger"
                  onClick={() => deleteItem(item.id, item.name)}
                >
                  delet
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="t-center">Empty</li>
        )}
      </ul>
      <div className="colAction">
        <div className="row between">
          <span>Count: {dataCols.length}</span>
          <button className="actionBtn btn-dange" onClick={clearCollection}>
            Clear all
          </button>
        </div>
      </div>
      <ActionWin
        activeWin={activeWin}
        setActiveWin={setActiveWin}
        openItemId={openItemId}
        dataItems={dataItems}
        setDataItems={setDataItems}
      />
    </>
  );
}

export default Collection;
