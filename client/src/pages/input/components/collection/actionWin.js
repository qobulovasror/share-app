// import AddItemWin from './additemWin';
import ItemView from "./itemView";
import ViewKey from "./viewKey";
function ActionWin(props) {
  const {
    activeWin, 
    setActiveWin,
    openItemId,
    dataItems,
    setDataItems
  } = props;
  const itemView = (id, item)=>{

  }
  const deleteItem = ()=>{  }
  const addItemToCol = ()=>{ }
  return (
    <>
      {
        (activeWin.ActionWin)? <>
          <div className="actionWin">
            {/* <AddItemWin/>  */}
             <ViewKey/>
             <ItemView/>
            <h3 className="t-center">{openItemId.name}</h3>
            <button className="cancel" onClick={()=>{
              setActiveWin({...activeWin, ActionWin: false})
              setDataItems([]);
              }}>x</button>
            <div className="column">
              <button className="addItemBtn" onClick={()=>addItemToCol(openItemId.id)}>Add item to this collection</button>
            </div>
            <ul className="list">
              {
                (dataItems.length>0)?  (
                dataItems.map((item) => (
                  <li className="row between" key={item.id} onClick={() => itemView(item.id, item)}>
                    <span className="itemName">
                        {item?.name?.length > 30
                          ? item.name.slice(0, 20) + "..."
                          : item.name}
                    </span>
                    <div className="actionBtn">
                      <button>edit</button>
                      <button className="btn-danger" onClick={() => deleteItem(item.id, item.name)}>delet</button>
                    </div>
                  </li>
                ))):(
                  <li className="t-center">Loading...</li>
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
