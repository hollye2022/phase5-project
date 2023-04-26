import React from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

function Home() {
  return (
    <div class="home">
      <h1 style={{color:"red",fontSize:"50px"}}>Welcome to "The Record"</h1>
      <h2 style={{color:"purple",fontSize:"40px"}}>Follow the steps below to create and track your habits.</h2>
      <p style={{color:"blue",fontSize:"30px"}} >Click "Explore" to add habits that you would like to track</p>
      <ArrowDownwardIcon style={{color:"green",fontSize:"50px"}}/>
      <p style={{color:"blue",fontSize:"30px"}} >Click "My Habits" to update your habits streaks</p>
      <ArrowDownwardIcon style={{color:"green",fontSize:"50px"}}/>
      <p style={{color:"blue",fontSize:"30px"}}>Stay motivated! </p>
    </div>
  )
}

export default Home