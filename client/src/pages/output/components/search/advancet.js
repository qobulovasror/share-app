import { useState } from "react"

function Advancet({ advan, setAdvan, setSearch, search, request }) {
    const [tag, setTag] = useState("");
    const addTagHandler = (e)=>{
        if(e.key === 'Enter'){
            if(tag.length===0)
                return
            if(tag[0]==='#'){
                if(tag.length===1)
                    return
                setSearch({ ...search, tags: [...search.tags, tag.slice(1,)] })
            }else
                setSearch({ ...search, tags: [...search.tags, tag] })
            setTag("");
        }
    }
    const advanDisplay = ()=>{
        setAdvan('none')
    }
    const userNameHandler = (e)=>{
        setSearch({...search, username: e.target.value})
    }
    const submitHandler = (e)=>{
        e.preventDefault();
    }
    const resetHandler = ()=>{
        setSearch({ ...search, tags: [] });
    }
  return (
    <div className="advancet" style={{display: advan}}>
      <form className="advancetSearch" onSubmit={submitHandler}>
        <div className="row between">
          <span>Advanced Search</span>
          <div className="cancel btn" onClick={advanDisplay}>x</div>
        </div>
        <div className="column">
          <label htmlFor="username" className="column">
            Username
            <input 
                type="text" 
                name="username" 
                id="username" 
                placeholder="username" 
                onChange={userNameHandler}
            />
          </label>
          <label htmlFor="hasteg" className="column">
            #hashteg
            <input 
                name="hasteg" 
                id="hasteg" 
                value={tag}
                onKeyDown={addTagHandler} 
                onChange={(e)=>setTag(e.target.value)}
            />
          </label>
          <ul className="tags row wrap">
            {search.tags.map((item, index)=>(<li key={index}>{item}</li>))}
          </ul>
        </div>
        <div className="advFooter row between">
          <span>result</span>
          <div className="row">
            <button type="reset" className="btn" onClick={resetHandler}>
              Reset
            </button>
            <div className="research btn" onClick={request}>Research</div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Advancet;
