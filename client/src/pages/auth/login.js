import { useState } from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { filterEmail } from '../../config/regxes';

import 'react-toastify/dist/ReactToastify.css';
import './assets/style.css'

function Login({setAuthToken}) {
    const navigate = useNavigate();
    const [user, setUser] = useState({email: "", password: ""});
    const changeHandler = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        if(user.email.length>5 && filterEmail.test(user.email)){
            if( user.password.length>5)
                login();
            else
                toast.warn("password invalid 🙁")
        }else
            toast.warn("email invalid 🙁")
    }
    const login = ()=>{
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            toast.success('login success 😄');
            const user = userCredential.user;
            setAuthToken(user.uid);
            window.localStorage.setItem('authToken', user.uid)
            navigate("/input")
        })
        .catch((error) => {
            toast.error(error.message+'🙁')
        });
    }
    return ( 
        <>
            <ToastContainer />
            <div className="card-login">
                    <form onSubmit={submitHandler}>
                        <h2>Sing In</h2>
                        <label htmlFor="email">
                            <h3>Email</h3>
                            <input 
                                type="email" 
                                id="email" 
                                name='email' 
                                placeholder='email' 
                                value={user.email}
                                onChange={changeHandler}
                                />
                        </label>
                        <label htmlFor="password">
                            <h3>Password</h3>
                            <input 
                                type="password" 
                                id="password" 
                                name='password' 
                                placeholder='password' 
                                value={user.password}
                                onChange={changeHandler}
                                />
                        </label>
                        <button>Sing In</button>
                    </form>
                    <span>I have not account ? <a href="/regis">Sing up</a></span>
                </div>
        </>
     );
}

export default Login;