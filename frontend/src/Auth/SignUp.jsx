import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { data, useNavigate } from 'react-router-dom';
const Signup = () => {
  // Basic info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate=useNavigate();

  const[loading,setLoading]=useState(false);

  // Role & profile
  const [role, setRole] = useState("seeker");
  const [pic, setPic] = useState("");

  // Expert-only fields
  const [expertise, setExpertise] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }


    const userData = {
      name,
      email,
      password,
      role,
      pic,
    };

    if (role === "expert") {
      userData.expertise = expertise;
      userData.bio = bio;
      userData.socialLinks = {
        linkedin,
        twitter,
        website,
      };
    }

    try {

        const config={
            headers:{
                "Content-type":"application/json"
            }
        };
    
      const res = await axios.post("http://localhost:3000/api/user/signup", userData,config);
      console.log("Signup success:", res.data);
      toast.success("Successfully Registered !!!");
      localStorage.setItem("UserInfo",JSON.stringify(data));
    
      if(role==="seeker"){
        navigate("/seekerDashboard")
      }else{
        navigate("/expertDashboard")
      }

      

      // Redirect or toast
    } catch (err) {
      console.error("Signup error:",  err.message);
    }
  };


  
    const handlePicUpload=(pic)=>{
        if(!pic){
            toast.warn("Please Select an Image !");
            return;
        }


        if(pic.type==='image/jpeg'||pic.type==='image/png'){

                const data=new FormData();

                data.append("file",pic);
                data.append("upload_preset","Nexus_io");
                data.append("cloud_name","dlm4qnn7s");

                fetch("https://api.cloudinary.com/v1_1/dlm4qnn7s/image/upload",{
                    method:"POST",
                    body:data
                })
                .then((res)=>res.json())
                .then((data)=>{
                    setPic(data.url.toString())
                    console.log(data);
                    toast.success("Image Uploaded !!!")
                })
                .catch((err)=>{
                    toast.error("Image Upload Failed !!!")
                    console.log(err)
                })


        }else{
            toast.warn("Only JPEG/PNG Allowed");
        }
    };

  return (
    <div className="container mt-5 d-flex flex-column flex-md-row justify-content-between align-items-start">
      <div className="col-md-6 mb-5 mb-md-0">
        <h2 className="mb-3 font-weight-bold">
          From curiosity to career—<span className="text-primary">build your future here</span>
        </h2>
        <p className="text-muted mb-4">
          Share and seek expertise with 1mn+ people on <strong>Nexus</strong>
        </p>

        <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm border" style={{ backgroundColor: "#f9f9f9" }}>
          <div className="form-group mb-3">
            <label>Name</label>
            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className="form-group mb-3">
            <label>Email address</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            <small className="form-text text-muted">We'll never share your email.</small>
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <div className="form-group mb-3">
            <label>Confirm Password</label>
            <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </div>

          <div className="form-group mb-3">
            <label>Role</label>
            <select className="form-control" value={role} onChange={e => setRole(e.target.value)}>
              <option value="seeker">Seeker</option>
              <option value="expert">Expert</option>
            </select>
          </div>

                  <div className="form-group mb-4">
            <label htmlFor="pic">Profile Picture</label>
            <input 
              type="file" 
              className="form-control" 
              id="pic"
              accept="image/*"
              onChange={(e)=>handlePicUpload(e.target.files[0])}
            />
          </div>


          {role === "expert" && (
            <>
              <div className="form-group mb-3">
                <label>Expertise</label>
                <input type="text" className="form-control" value={expertise} onChange={e => setExpertise(e.target.value)} />
              </div>

              <div className="form-group mb-3">
                <label>Bio</label>
                <textarea className="form-control" rows="3" value={bio} onChange={e => setBio(e.target.value)} />
              </div>

              <div className="form-group mb-3">
                <label>LinkedIn</label>
                <input type="text" className="form-control" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
              </div>

              <div className="form-group mb-3">
                <label>Twitter</label>
                <input type="text" className="form-control" value={twitter} onChange={e => setTwitter(e.target.value)} />
              </div>

              <div className="form-group mb-3">
                <label>Website</label>
                <input type="text" className="form-control" value={website} onChange={e => setWebsite(e.target.value)} />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-dark w-100">Get Started</button>
        </form>
      </div>

      <div className="col-md-5 text-center">
        <img
          src="/images/signup.png"
          alt="Signup"
          className="img-fluid rounded"
          style={{ maxHeight: "400px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default Signup;
