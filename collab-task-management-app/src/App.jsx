import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogIn from './LogIn';
import SignUp from './SignUp';
import Profile from './Profile';
import axios from 'axios';

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [signedUp, setSignup] = useState(false);
  const [user,setUser] = useState('');
  const [users,setUsers] = useState('');

  useEffect(() => {
    const fetchData = async ()=>{
      try{
        const response = await axios.get('http://localhost:3000/users');
        console.log('fetched users',response.data);
        setUsers(response.data);
      }catch(error){
        console.log('err',error);
      }
    }
    fetchData();
  },[]);
  return (
    <>
    <div>
      {
        signedUp?(
          loggedIn?(
            <div>
              Welcome to dashboard
              <Profile setUsers={setUsers} users={users} setUser={setUser} user={user}/>
            </div>
          ):(
            <LogIn setUsers={setUsers} users={users} setUser={setUser} user={user} setLogin={setLogin}/>
          )
        ):(
          <SignUp setUsers={setUsers} users={users} setUser={setUser} user={user} setSignup={setSignup}/>
        )
      }
    </div>
    </>
  )
}

export default App
