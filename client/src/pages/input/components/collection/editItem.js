import { useState } from "react";
import { db } from "../../../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function EditItem(props) {
  const { itemId, setItemId, fetchPost, setActiveWin, activeWin } = props;
  const cancel = ()=>{
    setActiveWin({...activeWin, EditItem: false})
    fetchPost()
    setItemId(null);
   }
  if(!activeWin.EditItem) return  <></>
  return (
    <>
      <div className="addItemWin">
        <h3 className="t-center">{itemId.name}</h3>
        <button className="cancel" onClick={cancel}>x</button>
        <ul className="itemBody">
          {
            (itemId.dataType.type==='link')?
            <EditLink 
              itemId={itemId} 
              cancel={cancel}/>:
              <EditText 
                itemId={itemId} 
                cancel={cancel}/>
          }
        </ul>
      </div>
    </>
  );
}


function EditLink(props) {
  const { itemId, cancel  } = props;
  const [data, setData] = useState({
    nameLink: itemId.name,
    link: itemId.dataType.value,
    description: itemId.commit,
    keyLink: itemId.key,
    tagsLink: itemId.tags
  })
  const changetHandler = (e)=>{ setData({...data, [e.target.name]: e.target.value}) }
  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      await updateDoc(doc(db, 'dataItems', itemId.id), {
        name: data.nameLink,
        commit: data.description,
        dataType: {
          type: itemId.dataType.type,
          value: data.link
        },
        key: data.keyLink,
        tags: data.tagsLink,
        createDate: itemId.createDate,
        owerId: itemId.owerId
      });
      toast.success("Edit success 😄");
    } catch (err) {
      toast.error(err + " 🙁");
    } 
    cancel()
  };
  const copyHandler = (e)=>{
    e.preventDefault()
    toast('coped to clipboard 🙂')
    navigator.clipboard.writeText(data.link)
  }
  return (
    <>
      <li className="typeLink">
        <form onSubmit={submitHandler}>
          <label htmlFor="nameLink">Name</label>
            <input 
              type="text" 
              name="nameLink" 
              id="nameLink" 
              placeholder="name" 
              onChange={changetHandler}
              value={data.nameLink}/>
            <div className="row between">
              <label htmlFor="link">Link</label>
              <button className="coptbtn" onClick={copyHandler}>copy</button>
            </div>
            <input 
              type="text" 
              name="link" 
              placeholder="link" 
              id="link" 
              onChange={changetHandler} 
              value={data.link}/>
          <label htmlFor="desLink">description</label>
            <textarea 
              name="description" 
              id="desLink" 
              cols="30" 
              rows="2" 
              placeholder="description"
              onChange={changetHandler}
              value={data.description}></textarea>
          <label htmlFor="keyLink">key</label>
            <input 
              type="text" 
              id="keyLink" 
              name="keyLink" 
              placeholder="password for open" 
              onChange={changetHandler} 
              value={data.keyLink}/>
          <label htmlFor="tagsLink">#tags</label>
            <input 
              type="text" 
              id="tagsLink" 
              name="tagsLink" 
              placeholder="tags"  
              onChange={changetHandler}
              value={data.tagsLink}/>
          <input type="submit" className="btn" value={"Submit"} />
        </form>
      </li>
    </>
  );
}

function EditText(props) {
  const { itemId, cancel  } = props;
  const [data, setData] = useState({
    nameText: itemId.name,
    text: itemId.dataType.value,
    desText: itemId.commit,
    keyText: itemId.key,
    tagsText: itemId.tags
  });
  const changetHandler = (e)=>{ setData({...data, [e.target.name]: e.target.value}) }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'dataItems', itemId.id), {
          name: data.nameText,
          commit: data.desText,
          dataType: {
            type: itemId.dataType.type,
            value: data.text
          },
          key: data.keyText,
          tags: data.tagsText,
          createDate: itemId.createDate,
          owerId: itemId.owerId
      });
      toast.success("Success 😄");
    } catch (err) {
      toast.error(err + " 🙁");
    }
    cancel()
  }
  const copyHandler = (e)=>{
    e.preventDefault()
    toast('coped to clipboard 🙂')
    navigator.clipboard.writeText(data.text)
  }
  return (
    <li className="typeText">
      <form onSubmit={submitHandler}>
        <label htmlFor="nameText">Name</label>
          <input 
            type="text" 
            name="nameText" 
            id="nameText" 
            placeholder="name" 
            onChange={changetHandler}
            value={data.nameText}/>
        <div className="row between">
          <label htmlFor="textText">Text</label>
          <button className="coptbtn" onClick={copyHandler}>copy</button>
        </div>
          <textarea
            id="textText"
            cols="30"
            rows="5"
            name="text"
            placeholder="text"
            onChange={changetHandler}
            value={data.text}
          ></textarea>
        <label htmlFor="desText">description</label>
          <textarea
            id="desText"
            cols="30"
            rows="2"
            placeholder="description"
            name="desText"
            onChange={changetHandler}
            value={data.desText}
          ></textarea>
        <label htmlFor="keyText">key</label>
          <input 
            type="text" 
            id="keyText" 
            name="keyText" 
            placeholder="password for open" 
            onChange={changetHandler}
            value={data.keyText}/>
        <label htmlFor="tagsText">#tags</label>
          <input 
            type="text" 
            name="tagsText" 
            id="tagsText" 
            placeholder="tags" 
            onChange={changetHandler}
            value={data.tagsText}/>
        <ul className="tags row wrap">
          <li>none</li>
        </ul>
        <input type="submit" className="btn" value={"Submit"} />
      </form>
    </li>
  );
}

export default EditItem;
