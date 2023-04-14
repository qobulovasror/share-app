import React,{ useState } from 'react';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { filterEmail } from '../../config/regxes';

import 'react-toastify/dist/ReactToastify.css';
import './assets/style.css';
function Regis({setAuthToken, setEmail}) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email:"", password: "", repass:""});
    const setInput = (e)=>{
        setUser({
            ...user, 
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e)=>{
        e.preventDefault();  
        if(user.password===user.repass){
            if(user.email.length > 5 && filterEmail.test(user.email)){
                if(user.password.length > 5)
                    createUser();
                else
                    toast.warn('password invalid 😯');
            }else{
                toast.warn('email invalid 😯');
            }
        }else{
            toast.warn('password and repassword don\'t match 😯');
        }
    }
    const createUser = async()=>{
        await createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success("sign up success 😊")
                setAuthToken(user.uid)
                window.localStorage.setItem('authToken', user.uid)
                setEmail(user.email)
                navigate("/input")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                toast.error(errorCode+" "+errorMessage+' 😯');
            });
    }
    return ( 
        <div>
            <ToastContainer />
            <div className="card-regs">
                <form onSubmit={submitHandler}>
                    <h2>Sign Up</h2>
                    <label htmlFor="email">
                        <h3>Email</h3>
                        <input 
                            type="email" 
                            id="email" 
                            name='email' 
                            placeholder='email' 
                            onChange={setInput} 
                            value={user.email}/>
                    </label>
                    <label htmlFor="password">
                        <h3>Password</h3>
                        <input type="password" id="password" name='password' placeholder='password' onChange={setInput} value={user.password}/>
                    </label>
                    <label htmlFor="repass">
                        <h3>Repassword</h3>
                        <input type="password" id="repass" name='repass' placeholder='repass' onChange={setInput} value={user.repass}/>
                    </label>
                    <button>Sign Up</button>
                </form>
                <span className='center'>I have not account? <Link to={"/login"}>Sign up</Link></span> <br/>
                <span className='center'>Main page <Link to={"/"}>Main</Link></span>
            </div>
        </div>
     );
}

export default Regis;