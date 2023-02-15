import { useState } from "react";
import axios from 'axios';
import Advancet from "./advancet";
import Category from "./category";

function Search({setResult}) {
  const [search, setSearch] = useState({
    text: "",
    type: "all",
    username: "",
    tags: []
  });
  const [advan, setAdvan] = useState("none");
  const changeHandler = (e)=>{
    setSearch({...search, text: e.target.value})
  }

  const request = ()=>{
    console.log("request");
    setAdvan("none")
    axios.get('/search', search)
      .then((res)=>{
        console.log(res.data);
        setResult(res.data);
      })
      .catch(err=>console.log(err))
  }
  return (
    <>
      <div className="search">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search ..."
          onChange={changeHandler}
          onKeyDown={(e)=>{ if(e.key==='Enter') request()} }
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
