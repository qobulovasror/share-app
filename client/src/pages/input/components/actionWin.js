function ActionWin(props) {
  const {
    activeWin, 
    setActiveWin
  } = props;
  return (
    <>
      {
        (activeWin.ActionWin)? <>
          <div className="actionWin">
            <h3 className="t-center">Colliction Name</h3>
            <button className="cancel" onClick={()=>setActiveWin({...activeWin, ActionWin: false})}>x</button>
            <div className="column">
              <button className="addItemBtn">Add</button>
            </div>
            <ul className="list">
              <li className="row between">
                <span className="itemName">item</span>
                <div className="actionBtn">
                  <button>edit</button>
                  <button>delet</button>
                </div>
              </li>
            </ul>
            <div className="colAction">
              <div className="row between">
                <span>Count: 10</span>
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
