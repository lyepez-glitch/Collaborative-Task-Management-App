import { useState } from 'react'
import axios from 'axios'

function SignUp({username,setUsername,password,setPassword,setSignup,setUser,user,setUsers,users}){

  const backendUrl = import.meta.env.VITE_RENDER_URL;

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const {data} = await axios.post(`${backendUrl}/signup`, document.querySelector('#signup'), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(data.message==='User registered successfully'){

      setSignup(true);
      setUser(data.user);
      const response = await axios.get(`${backendUrl}/users`);

      setUsers(response.data);
    }
  }
  return (
    <>
    <form className="signUpForm" id="signup" onSubmit={handleSubmit}>
      <h3 className="signUpHeader">Signup</h3>
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

      <button className="submitBtn" type="submit">Submit</button>
    </form>
    </>
  )
}
export default SignUp;