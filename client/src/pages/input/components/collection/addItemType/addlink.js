import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
function AddLink(props) {
  const { type, setActiveWin, activeWin, fetchPost, email } = props;
  const [data, setData] = useState({
    nameLink: "",
    link: "",
    description: "",
    keyLink: "",
    tagsLink: ""
  })
  const changetHandler = (e)=>{ setData({...data, [e.target.name]: e.target.value}) }
  const submitHandler = async (e) => {
    e.preventDefault();
    if (type !== "link") return;
    try {
      await addDoc(collection(db, "dataItems"), {
          name: data.nameLink,
          commit: data.description,
          dataType: {
            type: type,
            value: data.link
          },
          key: data.keyLink,
          tags: data.tagsLink,
          createDate: new Date(),
          owerId: email
      });
      fetchPost();
      setActiveWin({ ...activeWin, AddItemWin: false });
      toast.success("Success 😄");
    } catch (err) {
      toast.error(err + " 🙁");
      console.log(err);
    }
  };
  return (
    <>
      <li className="typeLink">
        <form onSubmit={submitHandler}>
          <label htmlFor="nameLink">Name</label>
          <input type="text" name="nameLink" id="nameLink" placeholder="name" onChange={changetHandler}/>
          <label htmlFor="link">Link</label>
          <input type="text" name="link" placeholder="link" id="link" onChange={changetHandler} />
          <label htmlFor="desLink">description</label>
          <textarea name="description" id="desLink" cols="30" rows="2" placeholder="description"
           onChange={changetHandler}></textarea>
          <label htmlFor="keyLink">key</label>
          <input type="text" id="keyLink" name="keyLink" placeholder="password for open" onChange={changetHandler} />
          <label htmlFor="tagsLink">#tags</label>
          <input type="text" id="tagsLink" name="tagsLink" placeholder="tags"  onChange={changetHandler}/>
          <input type="submit" className="btn" value={"Submit"} />
        </form>
      </li>
    </>
  );
}

export default AddLink;
