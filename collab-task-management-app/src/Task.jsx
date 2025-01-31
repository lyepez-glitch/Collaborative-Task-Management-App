import { useState } from 'react'
import axios from 'axios'

function Task({setTasks,users,token,setUsers}){
  const [assignTo,setAssignTo] = useState('');
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [dueDate,setDueDate] = useState('');
  const [status,setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const backendUrl = import.meta.env.VITE_RENDER_URL;



  const handleTaskSubmit = async(e) =>{
    e.preventDefault();

    const taskData = {
      title,
      desc,
      assignTo,
      dueDate,
      status
  };




    try {
        const { data } = await axios.post(`${backendUrl}/tasks`, taskData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });


        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000); // Hide popup after 3 seconds

        setTasks((prevTasks) => [...prevTasks, data]);
        // setTasks(data);
        const response = await axios.get(`${backendUrl}/users`);


        setUsers(response.data);


    } catch (error) {
        console.error('Error adding task:');
    }
    setAssignTo(null)
    setTitle(null);
    setDesc(null);
    setStatus(null);
  }
  return (
    <>
    <form className="taskForm" id="login" onSubmit={(e)=>handleTaskSubmit(e)}>
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
            <label htmlFor="status">Status:</label>
            <input
              type="text"
              id="status"
              name="status"
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
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





          <button className = "taskBtn" type="submit">Create Task</button>
        </form>
        {showPopup && <div className={`popup ${showPopup ? 'fade-out' : ''}`}>Task Created</div>}
    </>
  )
}
export default Task;