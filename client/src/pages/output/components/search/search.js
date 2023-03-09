import { useState } from "react";
import { db } from "../../../../firebase/firebase";
import Advancet from "./advancet";
import Category from "./category";
import { collection, query, where, getDocs } from "firebase/firestore";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Search(props) {
  const { setLoad, setResult, setSearch, search } = props;
  const [advan, setAdvan] = useState("none");
  const changeHandler = (e) => {
    setSearch({ ...search, text: e.target.value });
  };
  const request = async () => {
    setLoad(true);
    // setAdvan("none")
    await getDocs(collection(db, 'dataItems'))
      .then((querySnapshot)=>{
        const newData = querySnapshot.docs
          .filter((item)=>{
            if(search.text==="") return true;
            return (item.data().name.indexOf(search.text))>-1;
          })
          .map((doc) => ({...doc.data(), id:doc.id }));
        setResult(newData);
      })
      .catch(err=>console.log(err))
      .finally(()=>setLoad(false))

    // const dbQuery = query(
    //   collection(db, "dataItems"),
    //   where("name", "!=", search)
    // );
    // await getDocs(dbQuery)
    //   .then((querySnapshot) => {
    //     const newData = querySnapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }));
    //     setResult(newData);
    //     console.log(newData);
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setLoad(false));
  };
  return (
    <>
      <div className="search">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search ..."
          onChange={changeHandler}
          onKeyDown={(e) => {
            if (e.key === "Enter") request();
          }}
          value={search.text}
        />
      </div>
      <Category
        search={search}
        setSearch={setSearch}
        advan={advan}
        setAdvan={setAdvan}
      />
      <Advancet
        setSearch={setSearch}
        search={search}
        advan={advan}
        setAdvan={setAdvan}
        request={request}
      />
    </>
  );
}

export default Search;
