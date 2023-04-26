import React, { useState}from 'react'
import HabitsList from './HabitsList'
function Habits({habits,user,updateHabits,fetchHabits}) {

  //  const [habits, setHabits] = useState([])
  const [errors, setErrors] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [addTerm, setAddTerm] = useState("")

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

  

  function search(e){

    setSearchTerm(e.target.value)
  }


const newData=habits.filter(habit => habit.name.toLowerCase().includes(searchTerm.toLowerCase()))

function handleAddHabits(){

//  console.log({name:addTerm})

  fetch("/habits",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({name:addTerm})
  })
  .then(res=>{
    if(res.ok){
      res.json().then(updateHabits)
    }else{
      res.json().then(data=>setErrors(data.error))
    }
  })

 }
function add(e){
  setAddTerm(e.target.value)

}

  return (
    <div style={{textAlign:"center",margin:"15px",fontSize:"25px"}}>
      <label>Search Habits:
        <input type="text" onChange={search} value={searchTerm} ></input>
      </label>
     <br></br>

      <button onClick={handleAddHabits} style={{margin:"15px",fontSize:"15px"}} >Add Habit</button>
      <input placeholder='new habit' value={addTerm} onChange={add} ></input>

      <br></br>
      <label style={{color:"purple"}}>Habits:</label>
      <HabitsList habits={habits} newData={newData} user={user} fetchHabits={fetchHabits} />

    </div>
  )
}

export default Habits