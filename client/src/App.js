import { useState } from 'react';
import { Suspense, lazy } from 'react';
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';

import './assets/app.css';
import Loading from './pages/load/loading';

const Input = lazy(()=>import("./pages/input/input"));
const Output = lazy(()=>import("./pages/output/output"));
const Login = lazy(()=>import("./pages/auth/login"));
const Regis = lazy(()=>import("./pages/auth/regis"));

function App() {
  const [authToken, setAuthToken] = useState(window.localStorage.getItem("authToken")); 
  const [email, setEmail] = useState(); 

  return (
    <>
      <Suspense fallback={<Loading/>}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route 
              path='/input' 
              element={
              (authToken)? 
                  <Input setAuthToken={setAuthToken} email={email} setEmail={setEmail}/> 
                : <Navigate replace to="/login"/>
            }/>
            <Route path='/output' element={<Output/>}/>
            <Route path='/login' element={<Login setAuthToken={setAuthToken}  setEmail={setEmail}/>}/>
            <Route path='/regis' element={<Regis setAuthToken={setAuthToken}  setEmail={setEmail}/>}/>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

const Main = ()=>{
  return(
    <>
      <div className="App">
        <ul className="row between">
          <li><Link to="/output">get</Link></li>
          <li><Link to="/input">set</Link></li>
        </ul>
      </div>
    </>
  ) 
}

export default App;
