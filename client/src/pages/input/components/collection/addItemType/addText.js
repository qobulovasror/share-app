import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function AddText(props) {
  const { type, setActiveWin, activeWin, fetchPost, email } = props;
  const [data, setData] = useState({
    nameText: "",
    text: "",
    desText: "",
    keyText: "",
    tagsText: ""
  });
  const changetHandler = (e)=>{ setData({...data, [e.target.name]: e.target.value}) }
  const submitHandler = async (e) => {
    e.preventDefault();
    if (type !== "text") return;
    try {
      await addDoc(collection(db, "dataItems"), {
          name: data.nameText,
          commit: data.desText,
          dataType: {
            type: type,
            value: data.text
          },
          key: data.keyText,
          tags: data.tagsText,
          createDate: new Date(),
          owerId: email
      });
      fetchPost();
      setActiveWin({ ...activeWin, AddItemWin: false });
      toast.success("Success 😄");
    } catch (err) {
      toast.error(err + " 🙁");
    }
  }
  return (
    <>
      <li className="typeText">
        <form onSubmit={submitHandler}>
          <label htmlFor="nameText">Name</label>
            <input type="text" name="nameText" id="nameText" placeholder="name" onChange={changetHandler}/>
          <label htmlFor="textText">Text</label>
            <textarea
              id="textText"
              cols="30"
              rows="5"
              name="text"
              placeholder="text"
              onChange={changetHandler}
            ></textarea>
          <label htmlFor="desText">description</label>
            <textarea
              id="desText"
              cols="30"
              rows="2"
              placeholder="description"
              name="desText"
              onChange={changetHandler}
            ></textarea>
          <label htmlFor="keyText">key</label>
            <input type="text" id="keyText" name="keyText" placeholder="password for open" onChange={changetHandler}/>
          <label htmlFor="tagsText">#tags</label>
            <input type="text" name="tagsText" id="tagsText" placeholder="tags" onChange={changetHandler}/>
          <ul className="tags row wrap">
            <li>none</li>
          </ul>
          <input type="submit" className="btn" value={"Submit"} />
        </form>
      </li>
    </>
  );
}

export default AddText;
