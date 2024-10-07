import { useState } from 'react'
import axios from 'axios'

function LogIn({setLogin,setUser,user,setUsers,users}){
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(10)
    const {data} = await axios.post('http://localhost:3000/login', document.querySelector('#login'), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('data',data,data.message==='Logged In successfully')
    if(data.message==='Logged In successfully'){
      console.log(18)
      setUser(data.user);
      setLogin(true);
      const response = await axios.get('http://localhost:3000/users');
      console.log('fetched users',response.data);
      setUsers(response.data);

    }
  }
  return (
    <>
    <form id="login" onSubmit={handleSubmit}>
      <h3>LogIn</h3>
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

      <button type="submit">Submit</button>
    </form>
    </>
  )
}
export default LogIn;