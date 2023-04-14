import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../assets/style.css'
function ItemView(props) {
  const { selItem, activeWin, setActiveWin } = props;
  const copyHandler = (e)=>{ 
    e.preventDefault()
    toast('coped to clipboard 🙂')
    navigator.clipboard.writeText(selItem.dataType.value)
  }
  if (!activeWin.ViewItem) return <></>;
  return (
    <>
      <ToastContainer />
      <div className="viewItems">
        <div className="viewHeadder">
          <h3 className="t-center">{selItem.dataType.type}</h3>
          <button className="cancel" onClick={()=>{setActiveWin({...activeWin, ViewItem: false})}}>x</button>
        </div>
            <form onSubmit={(e)=>e.preventDefault()} className="column">
              <label htmlFor="nameLink">Name</label>
                <input 
                  type="text" 
                  name="nameLink" 
                  id="nameLink"
                  value={selItem.name}
                  disabled={true}/>
                <div className="row between">
                  <label htmlFor="link">{selItem.dataType.type}</label>
                  <button className="copyBtn" onClick={copyHandler}><i className='bx bx-copy' ></i></button>
                </div>
                {
                  (selItem.dataType.type==='text')?
                  <textarea 
                    name="link" 
                    cols="30" 
                    rows="4" 
                    disabled={true}
                    value={selItem.dataType.value}></textarea> :
                    <input 
                      type="text" 
                      name="link" 
                      value={selItem.dataType.value}
                      disabled={true}  />
                }
              <label htmlFor="desLink">description</label>
                <textarea 
                  name="description" 
                  cols="30" 
                  rows="2" 
                  disabled={true}
                  value={selItem.commit}></textarea>
              <label htmlFor="tagsLink">#tags</label>
                <input 
                  type="text"
                  name="tagsLink"  
                  disabled={true}
                  value={selItem.tags}/>
            </form>
      </div>
    </>
  );
}

export default ItemView;
