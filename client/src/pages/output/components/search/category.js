import { useState } from "react";
import { useEffect } from "react";

function Category({ setSearch, search, advan, setAdvan}) {
  const [check, setCheck] = useState(false);
    const checkedHandler = (e)=>{
        setSearch({...search, type: e.target.id});
        if(e.target.id!=='all')
            setCheck(false);
        else
            setCheck(true);
    }
    useEffect(()=>{
        setCheck(true);
    }, [])
    const advanDisplay = ()=>{
      setAdvan((advan==='none')? 'block' : 'none')
    }
  return (
    <>
      <div className="category row between">
        <ul className="row">
          <li>
            <input type="radio" name="searchType" id="all" checked={check} onChange={checkedHandler} />
            <label htmlFor="all">All</label>
          </li>
          <li>
            <input type="radio" name="searchType" id="file" onChange={checkedHandler}/>
            <label htmlFor="file">file</label>
          </li>
          <li>
            <input type="radio" name="searchType" id="link" onChange={checkedHandler}/>
            <label htmlFor="link">link</label>
          </li>
          <li>
            <input type="radio" name="searchType" id="text" onChange={checkedHandler}/>
            <label htmlFor="text">text</label>
          </li>
        </ul>
        <button className="btn" onClick={advanDisplay}>Advanced</button>
      </div>
    </>
  );
}

export default Category;
