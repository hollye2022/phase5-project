import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'


function Login({updateUser}) {

  const [formData, setFormData] = useState({
    username:"",
    // email:"",
    password:""
  })

  const [errors, setErrors] = useState([])
  const history = useHistory()

  function handleChange(e){
    setFormData(prevs=>({...prevs, [e.target.name]:e.target.value}))

  }

  function handleSubmit(e){
    e.preventDefault()
    fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res=>{
      if(res.ok){
        res.json().then(newUser=>{
          updateUser(newUser);
          history.push(`/users/${newUser.id}`);
        })
      }else {
        res.json().then(json => setErrors(Object.entries(json.errors)))
      }
    })
  }

  return (
    <div class="form-center">
    <form onSubmit={handleSubmit} >
      <label>Username:</label>
      <input type="text" name="username" value={formData.username} onChange={handleChange} style={{fontSize:"15px",height:"20px",marginTop:"10px"}}/>

      <br></br>

      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} style={{fontSize:"15px",height:"20px",marginTop:"10px"}} /> 

      <br></br>

     <input type="submit" value="Log in" style={{fontSize:"20px",backgroundColor:"yellow",height:"40px",marginTop:"10px",display:"flex"}}/>
    </form>

    {errors?errors.map(e => <div>{e[0]+': ' + e[1]}</div>):null}
    {/* {errors?<div>{errors}</div>:null} */}
    </div>
  )
}

export default Login