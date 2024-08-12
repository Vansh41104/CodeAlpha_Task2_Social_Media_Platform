import "./login.scss"
import React from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useContext,useState } from "react";
import { AuthContext} from "../../context/authContext";
import axios from "axios";

function Login() {
    const[inputs, setInputs] = React.useState({
        username: "",
        password:""
    });
    const[err, setErr] = useState(null);

    const navigate =useNavigate();

    const handleChange = (e) => {
        setInputs((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const {login} = useContext(AuthContext);
    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (err) {
            setErr(err.response.data);
        } 
    }
  return (
    <div>
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Quisquam eum, expedita eaque possimus nostrum accusantium 
                        voluptas laborum sit facilis ipsum? Ut quia dicta facere 
                        fugit fuga soluta cum ducimus amet?</p>
                    <span>Don't you have an account</span>
                    <Link to="/register">
                    <button>Register</button>
                    </Link>
                </div>
           
            <div className="right">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    {err && err}
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div> 
            </div>
        </div>
    </div>
  );
}

export default Login;
