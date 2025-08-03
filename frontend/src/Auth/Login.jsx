import React, { useState } from 'react';
import { data } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{

    e.preventDefault();

    if(!email || !password){
        toast.warn("Please Fill All The Details !!!");
        return;
    }

    try{
        const config={
            headers:{
                "Content-type":"application/json"
            }
        }
        const {data}=await axios.post("http://localhost:3000/api/user/login",{email,password},config);
        
        localStorage.setItem("UserInfo",JSON.stringify(data));
        toast.success("Login Succesfull !!!");
        
      if(data.role==="seeker"){
        navigate("/seekerDashboard")
      }else{
        navigate("/expertDashboard")
      }


    }catch(err){
        toast.error(err);
    }

  }

  return (
    <div className="container mt-5 d-flex flex-column flex-md-row align-items-center justify-content-between">
      
      {/* Left side: Form */}
      <div className="col-md-6 mb-4 mb-md-0">
        <h2 className="mb-3 font-weight-bold">Welcome back</h2>
        <p className="text-muted">Sign in to join calls and manage bookings</p>

        <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm border" style={{ backgroundColor: "#f9f9f9" }}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit"  className="btn btn-dark w-100">Login</button>
        </form>
      </div>

      {/* Right side: Image */}
      <div className="col-md-5 text-center">
        <img 
          src="/images/sign-in-back.svg" 
          alt="Login Illustration" 
          className="img-fluid rounded"
          style={{ maxHeight: "400px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default Login;
