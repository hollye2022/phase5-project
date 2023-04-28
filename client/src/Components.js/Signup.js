import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

function Signup() {

  const [formData, setFormData] = useState({
    email:"",
    username:"",
    password:""

  })
  const [errors, setErrors] =useState([])
  const history = useHistory()
  const {username,password,email} = formData

  function handleChange(e){
    setFormData(prevs=>({...prevs,[e.target.name]:e.target.value}))
  }

  function handleSubmit(e){
    e.preventDefault()
    const user = {
      username,
      email,
      password
    }
    fetch(`/users`,{
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(user)
    })
    .then(res=>{
      if(res.ok){
        res.json().then(user=>{
          // history.push(`/users/${user.id}`)
          history.push(`/login`)
        })
      }else {
        res.json().then(json=>setErrors(Object.entries(json.errors)))
      }
    })

  }
  return (
    <div class="form-center" >
    <form onSubmit={handleSubmit} >

    <label>Email:</label>
      <input type="text" name="email" value={formData.email} onChange={handleChange} style={{fontSize:"15px",height:"20px",marginTop:"10px"}} />
      <br></br>

      <label>Username:</label>
      <input type="text" name="username" value={formData.username} onChange={handleChange} style={{fontSize:"15px",height:"20px",marginTop:"10px"}} />

      <br></br>
      
      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} style={{fontSize:"15px",height:"20px",marginTop:"10px"}} /> 

      <br></br>

     <input type="submit" value="Sign up" style={{fontSize:"20px",backgroundColor:"yellow",height:"40px",marginTop:"10px"}} />
    </form>
    {errors?errors.map(e => <div>{e[0]+': ' + e[1]}</div>):null}
    </div>
  )
}

export default Signup