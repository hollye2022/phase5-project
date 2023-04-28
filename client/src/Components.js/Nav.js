import React from 'react'
import { Link, NavLink, useHistory} from "react-router-dom"

function Nav({user, updateUser}) {

 const history = useHistory()
  function logout(){

    fetch(`/logout`,{
      method:"DELETE"
    })
    .then(res=>{
      if(res.ok){
        updateUser(null)
        history.push("/login")
      }
    })

  }
  return (
    <div  style={{height:60, border:"1px solid purple"}} className="nav-container">
      <h1 style={{color: 'purple'}}>Welcome to The RECORD</h1>
      {user?  <button onClick={logout} >log out</button> : null }

      <Link to="/Home"> 
      <span>🌻</span>
      </Link>

      { user && <NavLink to="/Home">
        <button>Home</button>
      </NavLink> }

      {user && <NavLink to="/Habits">
        <button>Explore</button>
      </NavLink> }

     {user && <NavLink to={`/users/${user.id}`}>
        <button>My Habits</button>
      </NavLink>} 

      {/* { user && <NavLink to="/Notes">
        <button>Notes</button>
      </NavLink> } */}

      {/* {user? <NavLink to="/logout">
        <button onClick={logout} >log out</button>
      </NavLink> :
      <NavLink to="/login">
        <button>log in</button>
      </NavLink>
      } */}

       { !user && <NavLink to="/login">
        <button >log in</button>
      </NavLink> }
    


      {/* <NavLink to="/logout">
        <button onClick={logout} >log out</button>
      </NavLink> */}

      {!user && <NavLink to="/users/new">
        <button>Sign up</button>
      </NavLink> }


    </div>
  )
}

export default Nav