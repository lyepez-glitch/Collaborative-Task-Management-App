import { useState } from 'react'
import axios from 'axios'

function LogIn({password,setPassword,username,setFirstName,setLastName,setUserName,setLogin,setUser,user,setUsers,users,setToken}){


  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(10)
    const {data} = await axios.post('https://collaborative-task-management-app.onrender.com/login', document.querySelector('#login'), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('data',data,data.message==='Logged In successfully')
    if(data.message==='Logged In successfully'){
      console.log(18)
      setUser(data.user);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserName(user.userName);
      setToken(data.token);
      setLogin(true);
      const response = await axios.get('https://collaborative-task-management-app.onrender.com/users');
      console.log('fetched users',response.data);
      setUsers(response.data);

    }
  }
  return (
    <>
    <form className="logInForm" id="login" onSubmit={handleSubmit}>
      <h3 className="logInHeader">LogIn</h3>
      <div>
        <label htmlFor="name">username:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
      </div>
      <input
          type="hidden"
          name="userId"
          value={user.id}
        />

      <button className="loginBtn" type="submit">Submit</button>
    </form>
    </>
  )
}
export default LogIn;