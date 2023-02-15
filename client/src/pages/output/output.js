import { useState } from "react";
import Header from "./components/header";
import Result from "./components/result";
import Search from "./components/search/search";
import "./assets/style.css";

function Output() {
  const [result, setResult] = useState([]);
  return (
    <>
      <div className="card output">
        <Header />
        <Search setResult={setResult} />
        <ul className="result">
          {result.length ? (
            result.map((item, index) => <Result name={item.name} key={index} type={item.type} />)
          ) : (
            <li className="t-center">No data</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Output;
