import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { Card, CardContent, Typography, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

function HabitsList({newData,user,fetchHabits}) {

  const history=useHistory()
  const [errors, setErrors] = useState([])

    function handleClick(id){

      fetch("/streaks",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({habit_id:id,user_id:user.id,count:0})
      })
      .then(res=>{
        if(res.ok){
          history.push(`/users/${user.id}`)
          fetchHabits()
        }else {
          res.json().then(data=>setErrors(data))
      }
    })
// console.log(id,user.id)
    }
    const filteredNewData = newData.filter(habit=> {
      return habit.users.every(habUser => habUser.username !== user.username)
    }) 

    

  return (

    <Grid container spacing ={2}>
      {filteredNewData.map((habit,index)=>(
         <Grid item xs={12} sm={6} md={4} key={index}>
         <Card style={{width: '80%',
                       backgroundColor: '#ffdd22',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       flexDirection: 'column',
                       position: 'relative'}}>
           <CardContent style={{textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column'}}>
             <Typography variant="h5" component="h2">{habit.name}</Typography>
             <br></br>
             <Fab onClick={() => handleClick(habit.id)} style={{backgroundColor: 'white'}}><AddIcon /></Fab>
             
           </CardContent>
         </Card>
       </Grid>
      ))}
    </Grid>


    // <div style={{textAlign:"center",fontSize:"25px"}}>
    //     {newData.map(habit=>(
    //         <p key={habit.id} >
    //           <button onClick={()=>handleClick(habit.id)}  >select</button>
    //           {habit.name}
    //         </p>
    //     ))}
    // </div>
  )
}

export default HabitsList