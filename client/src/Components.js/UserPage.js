import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { Card, CardContent, Typography, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'


function UserPage({fetchHabits}) {

  const [myUser, setMyUser] = useState()
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)
  // const [count, setCount] = useState(0)

  const params = useParams()
  const {id} = params

  function fetchUser() {
    fetch(`/users/${id}`)
    .then(res=>{
      if(res.ok){
        res.json().then(newUser=>{
          setMyUser(newUser)
          setLoading(false)
        })
      }else{
        res.json().then(data=>setErrors(data.errors))
      }
    })
  }

  useEffect(()=>{
    fetchUser();
  },[])

  if(errors) return <h1>{errors}</h1>
  if(loading) return <h1>Loading</h1>

  function handleIncrement(streak_id){
    fetch(`/streaks/${streak_id}/increment_count`,{
      method:"POST",
      headers:{
        "Content_Type":"application/json"
      }
    }).then(res => {
      if(res.ok){
        console.log(res);
        fetchUser();
      }else{
        res.json().then(data=>setErrors(data.errors))
      }
    })
  }

  function handleDelete(id){
    fetch(`/streaks/${id}`,{
     method: "DELETE"
    }).then(res => {
      if(res.ok){
        console.log(res);
        fetchUser();
        fetchHabits();
      }else{
        res.json().then(data=>setErrors(data.errors))
      }
    })
  }

  const sortedMyStreaks = myUser.streaks.sort((a,b) => a.habit.name.localeCompare(b.habit.name));
  console.log("My streaks:")
  console.log(sortedMyStreaks);

  return (
    <div>
      <h1>{myUser.username}
      </h1>

      <Grid container spacing ={2}>
      {sortedMyStreaks.map((streak,index) => (
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
              <Typography variant="h5" component="h2">{streak.habit.name}</Typography>
              <div style={{flexGrow: 1}} />
              <Typography variant="h1" component="h1">{streak.count}</Typography>
              <Typography variant="p" component="p">days</Typography>
              <br></br>
              {/* <Fab onClick={() => handleIncrement(streak.id)} style={{backgroundColor: 'white', position: 'absolute', bottom: '24px', right: '78px'}}>Mo</Fab>
              <Fab onClick={() => handleIncrement(streak.id)} style={{backgroundColor: 'white', position: 'absolute', bottom: '24px', right: '140px'}}>Tu</Fab>
              <Fab onClick={() => handleIncrement(streak.id)} style={{backgroundColor: 'white', position: 'absolute', bottom: '24px', right: '202px'}}>We</Fab>
              <Fab onClick={() => handleIncrement(streak.id)} style={{backgroundColor: 'white', position: 'absolute', bottom: '24px', right: '264px'}}>Th</Fab>
              <Fab onClick={() => handleIncrement(streak.id)} style={{backgroundColor: 'white', position: 'absolute', bottom: '24px', right: '326px'}}>Fr</Fab>
              <Fab onClick={() => handleIncrement(streak.id)} style={{backgroundColor: 'white', position: 'absolute', bottom: '24px', right: '388px'}}>Sa</Fab>
              <Fab onClick={() => handleIncrement(streak.id)} style={{backgroundColor: 'white', position: 'absolute', bottom: '24px', right: '450px'}}>Su</Fab> */}
              <Fab onClick={() => handleIncrement(streak.id)} style={{backgroundColor: 'white'}}><AddIcon /></Fab>
              <Fab onClick={() => handleDelete(streak.id)} style={{backgroundColor: 'white', position: 'absolute', bottom: '24px', right: '16px'}}><DeleteIcon /></Fab>
            </CardContent>
          </Card>
        </Grid>
        // <li>{streak.habit.name}:{streak.count} times</li>
      ))}
      </Grid>
      <ul>
      {/* {myUser.streaks.map(streak => <li>{streak.habit.name}:{streak.count} times</li> )} */}
      </ul>
      <h3>Notes</h3>
      {myUser.notes.map(note => <li>Today's thoughts: {note.content}</li>)}
       
    </div>
  )
}

export default UserPage