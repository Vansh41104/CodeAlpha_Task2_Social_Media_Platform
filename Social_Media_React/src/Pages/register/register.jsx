import "./register.scss"
import React from 'react';
import { Link ,useNavigate} from "react-router-dom" 
import axios from "axios";
import { useState } from "react";

function Register() {

    const[inputs, setInputs] = React.useState({
        username: "",
        email: "",
        password:"",
        name: ""
    });
    const[err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const navigate =useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        try{
            await axios.post("http://localhost:3000/api/auth/register", inputs);
            navigate("/login");
        }
        catch(err){
            setErr(err.response.data);
        }
    };
    console.log(err);

  return (
    <div>
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Social Media App</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Quisquam eum, expedita eaque possimus nostrum accusantium 
                        voluptas laborum sit facilis ipsum? Ut quia dicta facere 
                        fugit fuga soluta cum ducimus amet?</p>
                    <span>Do you have an account</span>
                    <Link to="/login">
                    <button>Login</button>
                    </Link>
                </div>
           
            <div className="right">
                <h1>Register</h1>
                <form>
                    <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                    <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    <input type="name" placeholder="Name" name="name" onChange={handleChange}/>
                    {err && err}
                    <button onClick={handleClick}>Register</button>
                </form>
            </div> 
            </div>
        </div>
    </div>
  );
}

export default Register;
