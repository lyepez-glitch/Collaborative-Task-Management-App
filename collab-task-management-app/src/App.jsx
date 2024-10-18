import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'






import './App.css'
import LogIn from './LogIn';
import SignUp from './SignUp';
import Profile from './Profile';
import Project from './Project';
import axios from 'axios';
import User from './User';

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [signedUp, setSignup] = useState(false);
  const [user,setUser] = useState('');
  const [users,setUsers] = useState('');
  const [token,setToken] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');


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
            <div className="dashboardHeader">
              Welcome to dashboard
              <Profile token={token} username={userName} setUserName={setUserName} setFirstName={setFirstName} setLastName={setLastName}  setPassWord={setPassword} password={password} firstName={firstName} lastName = {lastName}  setUsers={setUsers} users={users} setUser={setUser} user={user}/>
              <User setUsers={setUsers} token={token} users={users}/>
              <Project users={users} setUsers={setUsers} token={token}/>
            </div>
          ):(
            <LogIn password={password} username={userName} setPassword={setPassword} setUserName={setUserName} setFirstName={setFirstName} setLastName={setLastName} setToken={setToken} setUsers={setUsers} users={users} setUser={setUser} user={user} setLogin={setLogin}/>
          )
        ):(
          <SignUp username={userName} setUsername={setUserName} password={password} setPassword={setPassword} setUsers={setUsers} users={users} setUser={setUser} user={user} setSignup={setSignup}/>
        )
      }
    </div>
    </>
  )
}

export default App
