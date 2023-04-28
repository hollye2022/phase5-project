// import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
// import Hi from './Components.js/Hi';
// import Bye from './Components.js/Bye';
import Fallback from './Fallback';
import Home from "./Components.js/Home";
import Nav from "./Components.js/Nav";
import Habits from "./Components.js/Habits";
import UserPage from './Components.js/UserPage';
// import Notes from './Components.js/Notes';
import Login from './Components.js/Login';
import Signup from './Components.js/Signup';

function App() {

  const [user, setUser] = useState(null)
  const [habits, setHabits] = useState([])
  const [errors, setErrors] = useState(false)

  useEffect(()=>{
    fetch("/me").then((res)=>{
      // console.log('Fetch user result:')
      // console.log(res);
      if(res.ok){
        res.json().then((user)=> setUser(user))
      } else {
        // console.log('no user');
        setUser(null);
      }
    })
  },[]);

  useEffect(()=>{
    fetch(`/habits`)
    .then(res=>{
      if(res.ok){
        res.json().then(setHabits)
      } else{
        res.json().then(data=>setErrors(data.error))
      }
    })
  },[])

  function fetchHabits(){
    fetch(`/habits`)
      .then(res=>{
        if(res.ok){
          res.json().then(setHabits)
        } else{
          res.json().then(data=>setErrors(data.error))
        }  
    })
  }

  function updateUser(x){
    setUser(x)
  }
function updateHabits(x){
  setHabits(prev=>[...prev,x])

}
  // if(user){
  //   return <h2>Welcome, {user.username}!</h2>
  // } else{
  //   return < login onLogin={setUser} />
  // };
  
  // const [habits, setHabits] = useState([])
  // const [errors, setErrors] = useState(false)
  // useEffect(()=>{
  //   fetch(`/habits`)
  //   .then(res=>{
  //     if(res.ok){
  //       res.json().then(setHabits)
  //     } else{
  //       res.json().then(data=>setErrors(data.error))
  //     }
  //   })
  // },[])
  return (
    <div>
      <Nav user={user} updateUser={updateUser} />

      {!user? <Switch>

        <Route path= "/login">
        <Login updateUser={updateUser} />
       </Route>

       <Route path='/users/new'>
        <Signup />
        </Route>

      </Switch> : 
      <Switch>
        

        <Route path="/home">
        <Home />
        </Route>

        {/* <Route path="/Notes">
          <Notes />
        </Route> */}
       
        <Route path="/habits">
          <Habits habits={habits} user={user} updateHabits={updateHabits} fetchHabits={fetchHabits} />
        </Route>

       <Route path= "/users/:id">
        <UserPage fetchHabits={fetchHabits} />
       </Route>

       <Route path="/*">
          <Fallback />
        </Route>


      </Switch>
      }
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <h1>Hello Holly</h1>
    //     <Link to="/hi">click for hi</Link>
    //     <br></br>
    //     <Link to="/bye">click for bye</Link>
      
    //   <Switch>
    //     <Route path="/hi">
    //     <Hi/>
    //     </Route>

    //     <Route path="/bye">
    //     <Bye/>
    //     </Route>

    //   </Switch>
    //   </header>
    // </div>
  );
}

export default App;
