import { useState } from 'react'
import axios from 'axios'

function Task({users,token,setUsers}){
  const [assignTo,setAssignTo] = useState('');
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [dueDate,setDueDate] = useState('');



  const handleTaskSubmit = async(e) =>{
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('title', title);
    // formData.append('desc', desc);
    // formData.append('assignTo', assignTo);
    const taskData = {
      title,
      desc,
      assignTo,
      dueDate
  };




    try {
        const { data } = await axios.post(`http://localhost:3000/tasks`, taskData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log('task response:', data);

        const response = await axios.get('http://localhost:3000/users');
        // console.log('fetched users',response.data);
        setUsers(response.data);


    } catch (error) {
        console.error('Error adding task:', error.message);
    }
    setAssignTo(null)
    setTitle(null);
    setDesc(null);
  }
  return (
    <>
    <form id="login" onSubmit={(e)=>handleTaskSubmit(e)}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="desc">Description:</label>
            <input
              type="text"
              id="desc"
              name="desc"
              value={desc}
              onChange={(e)=>setDesc(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="assignTo">Assign To:</label>
            <select name="assignTo"

            value={assignTo}
            onChange={e => {
              setAssignTo(e.target.value);
            }}>
              {
                users.map((user)=>(

                  <option key= {user.username} value={user.id}>{user.username}</option>

  ))
              }

            </select>


          </div>

          <div>
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={(e)=>setDueDate(e.target.value)}
              required
            />
          </div>





          <button type="submit">Create Task</button>
        </form>
    </>
  )
}
export default Task;