import { useState, useEffect } from 'react';
import axios from 'axios';
import  io  from 'socket.io-client';



function Project({ tasks,setTasks,token,setUsers,users }) {
  const [updatedTask,setUpdatedTask] = useState({});


    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    // const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [projects,setProjects] = useState([]);
    const [edit,setEdit] = useState(false);
    const [editedName,setEditedName] = useState('');
    const [editedDescription,setEditedDescription] = useState('');
    const [editedSelectedTasks,setEditedSelectedTasks] = useState('');
    const [editedStatus,setEditedStatus] = useState('');
    const [editStatus,setEditStatus,] = useState('');
    const [editAssign,setEditAssign] = useState('');
    const [editAssignTo,setEditAssignTo] = useState('');
    const [showProjPopup, setShowProjPopup] = useState(false);


    const [status,setStatus] = useState('');
    const socket = io('https://collaborative-task-management-app.onrender.com',{auth:{token:token}});


    const updateStatus = () =>{

    }

    useEffect(()=>{
      const fetchTasks = async () => {
        try {
            const response = await axios.get('https://collaborative-task-management-app.onrender.com/tasks');
            console.log('tasks are',response.data)
            setTasks(response.data.tasks);
            const projResponse = await axios.get('https://collaborative-task-management-app.onrender.com/projects');
            console.log('projs are',projResponse.data)
            setProjects(projResponse.data)

        } catch (error) {
            console.log('Error fetching tasks:', error);
        }
    };

      const fetchProjects = async () => {
          try {
              const response = await axios.get('https://collaborative-task-management-app.onrender.com/projects');
              setProjects(response.data);
          } catch (error) {
              console.log('Error fetching projects:', error);
          }
      };


      socket.on('connect', () => {
        console.log('Socket connected');
      });


      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
      socket.on('status change',(updatedTask)=>{
        console.log(59,updatedTask)
        // setUpdatedTask(updatedTask);
        setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, status: updatedTask.status } : task
          )
          );
      })
      socket.on('assign change',(updatedTask)=>{
        console.log(76,updatedTask)
        // setUpdatedTask(updatedTask);
        setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, assignedToId: updatedTask.assignedToId } : task
          )
          );
      })

      fetchTasks();
      fetchProjects();

      return () => {
        socket.off('status change');
        socket.off('assign change');
        socket.disconnect();
      };



    },[token])

    const setEditAssignToHandler =(e,task)=>{
      setEditAssignTo(task.assignedToId)
      setEditAssign(task.id);
    }
    const handleEditAssignSubmit = async(e,id,task)=>{
      e.preventDefault();
      console.log('handleEditAssignSubmit')
      if(editAssignTo){
        console.log(90,{id:id,assignedToId:editAssignTo},task.assignedToId)
        socket.emit('assign change',{id:id,assignedToId:editAssignTo})
        setEditAssignTo('');
        setEditAssign('')

        const tasksResponse = await axios.get('https://collaborative-task-management-app.onrender.com/tasks');
        console.log('fetched tasks', tasksResponse.data.tasks,updatedTask);
        const editTasks = tasksResponse.data.tasks.map((task) =>
          task.id === updatedTask.id ? { ...task, assignedToId: updatedTask.assignedToId } : task
          )
        setTasks(editTasks);
        const projectsResponse = await axios.get('https://collaborative-task-management-app.onrender.com/projects');
        console.log('fetched projects', projectsResponse.data);
        setProjects(projectsResponse.data);
        // const usersResponse = await axios.get('https://collaborative-task-management-app.onrender.com/users');
        // console.log('fetched users', usersResponse.data);
        // setUsers(usersResponse.data);



      }
    }

    const handleAssignEdit = async(e,id,task)=>{
      setEditAssign(id);
      setEditAssignTo(task.assignedToId);
    }

    const handleEditStatusSubmit = async (e,id)=>{
      e.preventDefault();

      console.log('handleEditStatusSubmit')

      if(editedStatus){
        console.log(79,{id:id,status:editedStatus})
        socket.emit('status change',{id:id,status:editedStatus})
        setEditStatus('');
        const tasksResponse = await axios.get('https://collaborative-task-management-app.onrender.com/tasks');
        console.log('fetched tasks', tasksResponse.data.tasks,updatedTask);
        const editTasks = tasksResponse.data.tasks.map((task) =>
          task.id === updatedTask.id ? { ...task, status: updatedTask.status } : task
          )
        setTasks(editTasks);
        const projectsResponse = await axios.get('https://collaborative-task-management-app.onrender.com/projects');
        console.log('fetched projects', projectsResponse.data);
        setProjects(projectsResponse.data);


      }


    }
    const handleStatusEdit = (e,id,status) =>{
      setEditStatus(id);
      setEditedStatus(status);
    }
    const handleEditSubmit = async (e) => {
      e.preventDefault();

      const projectData = {
          name:editedName,
          description: editedDescription,
          task: editedSelectedTasks
      };

      try {
          const { data } = await axios.put(`https://collaborative-task-management-app.onrender.com/projects/edit/${edit}`, projectData, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
          });

          console.log('edited project response:', data);
          const response = await axios.get('https://collaborative-task-management-app.onrender.com/projects');
          console.log('fetched projects', response.data);
          setProjects(response.data);
          // const userResponse = await axios.get('https://collaborative-task-management-app.onrender.com/users');
          // console.log('fetched users', userResponse.data);
          // setUsers(userResponse.data);
          setEdit('')
      } catch (error) {
          console.error('Error adding project:', error.message);
      }


      setName('');
      setDesc('');
      setSelectedTasks([]);
      setEditedName('');
      setEditedDescription('');
      setEditedSelectedTasks([]);
  };
    const handleProjectEdit = (e,id,name,description,tasks) =>{
      console.log('edited project',id,name,description,tasks)
      setEdit(id)
      setEditedName(name)
      setEditedDescription(description)
      setEditedSelectedTasks(tasks.map(task => task.id))
    }

    // useEffect(() => {
    //     const fetchTasks = async () => {
    //         try {
    //             const response = await axios.get('https://collaborative-task-management-app.onrender.com/tasks');
    //             console.log('fetched tasks', response.data);
    //             setTasks(response.data.tasks);
    //         } catch (error) {
    //             console.log('err', error);
    //         }
    //     };
    //     fetchTasks();

    //     const fetchProjects = async () => {
    //       try {
    //           const response = await axios.get('https://collaborative-task-management-app.onrender.com/projects');
    //           console.log('fetched projects', response.data);
    //           setProjects(response.data);
    //       } catch (error) {
    //           console.log('err', error);
    //       }
    //   };
    //   fetchProjects();

    // }, []);

    const handleProjectSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            name,
            description: desc,
            task: selectedTasks // Pass selected tasks
        };

        try {
            const { data } = await axios.post(`https://collaborative-task-management-app.onrender.com/projects`, projectData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('project response:', data);
            setShowProjPopup(true);
            setTimeout(() => {
              setShowProjPopup(false);
            }, 3000); // Hide popup after 3 seconds
            const response = await axios.get('https://collaborative-task-management-app.onrender.com/projects');
            console.log('fetched projects', response.data);
            setProjects(response.data);
        } catch (error) {
            console.error('Error adding project:', error.message);
        }

        // Reset form fields
        setName('');
        setDesc('');
        setSelectedTasks([]); // Reset selected tasks
    };

    const handleTaskChange = (e) => {
        const { options } = e.target;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setSelectedTasks(selected); // Update selected tasks
    };
    const handleEditedTaskChange = (e) => {
      const { options } = e.target;
      const selected = [];
      for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
              selected.push(options[i].value);
          }
      }
      setEditedSelectedTasks(selected); // Update selected tasks
  };

    return (
        <>

            <div className="projectsContainer">
              <h3 className= "projectsHeader">Projects: </h3>
              {
                projects && projects.map((proj) => (
                  <>
                  {edit === proj.id?(
                    <form className="editProjectForm" id="editProject" onSubmit={(e)=>handleEditSubmit(e)}>
                    <h3>Edit Project</h3>
                    <div>
                      <label htmlFor="editedName">Edit Name:</label>
                      <input
                        type="text"
                        id="editedName"
                        name="editedName"
                        value={editedName}
                        onChange={(e)=>setEditedName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="editedDescription">Edit Description:</label>
                      <input
                        type="editedDescription"
                        id="editedDescription"
                        name="editedDescription"
                        value={editedDescription}
                        onChange={(e)=>setEditedDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                    <label htmlFor="editedTask">Edit tasks:</label>
                    <select
                        name="editedTask"
                        multiple
                        value={editedSelectedTasks}
                        onChange={handleEditedTaskChange}
                    >
                        {tasks.map((task) => (
                            <option key={task.id} value={task.id}>{task.title}</option>
                        ))}
                    </select>
                </div>


                    <button type="submit">Submit</button>
                  </form>
                  ):(
                    <ul className="projectEle">
                    <li>Name:{proj.name}</li>
                    <li>Description:{proj.description}</li>
                    <button onClick={(e)=>{handleProjectEdit(e,proj.id,proj.name,proj.description,proj.tasks)}}>Edit</button>

                    <li>
                      <ul>
                        <li className="kanban">
                          Tasks:
                        </li>
                        <div >
                          {
                          proj.tasks?(
                            <div className="kanban-board">

                            <div className="column">
                              <h2 class="kanbanTitle">To Do</h2>
                            {
                              proj.tasks
                                .filter((task) => task.status === 'To Do')
                                .map((task, index) => (
                                  <div key={index}>Task: {task.title}</div>
                                ))
                            }

                            </div>
                            <div className="column">
                                <h2 class="kanbanTitle">In Progress</h2>
                                {
                              proj.tasks
                                .filter((task) => task.status === 'In Progress')
                                .map((task, index) => (
                                  <div key={index}>Task: {task.title}</div>
                                ))
                            }

                            </div>
                            <div className="column">
                                <h2 class="kanbanTitle">Done</h2>
                                {
                              proj.tasks
                                .filter((task) => task.status === 'Done')
                                .map((task, index) => (
                                  <div key={index}>Task: {task.title}</div>
                                ))
                            }
                            </div>
                        </div>
                          ):(<></>)
                          }
                        </div>

                        {
                        proj.tasks && proj.tasks.map((task, index) => (
                            <>

{
                              editStatus === task.id?(
                                <form onSubmit={(e)=>handleEditStatusSubmit(e,task.id)}>
                                  <div>
                                    <label htmlFor="status">Status:</label>
                                    <input
                                      type="text"
                                      id="editedStatus"
                                      name="editedStatus"
                                      value={editedStatus}
                                      onChange={(e)=>setEditedStatus(e.target.value)}
                                      required
                                    />
                                 </div>
                                 <button type="submit">Submit</button>
                                </form>
                              ):(

                                <>
                                <li key={index}>task: {task.title}</li>
                                <li>Status:{task.status}</li>
                                <li>
                                  <button onClick={(e)=>handleStatusEdit(e,task.id,task.status)}>Edit Status</button>
                                </li>

                                </>

                              )
                            }
                            {/* <li key={index}>task: {task.title}</li> */}



                            {
                              editAssign === task.id?(
                                <form onSubmit = {(e)=>handleEditAssignSubmit(e,task.id,task)}>
                                  <div>
                                  <label htmlFor="editAssignTo">Edit Assign To:</label>
                                  <select name="editAssignTo"

                                  value={editAssignTo}
                                  onChange={e => {
                                    setEditAssignTo(e.target.value);
                                  }}>
                                    {
                                      users.map((user)=>(

                                        <option key= {user.username} value={user.id}>{user.username}</option>

                                  ))
                                    }

                                  </select>

                            </div>
                                  <button type="submit">Submit</button>
                                </form>


                              ):(

                                <>
                                <li>Assigned to:
                                  {
                                        users.map((user)=>(
                                          user.id === task.assignedToId?(
                                            <option key= {user.username} value={user.id}>{user.username}</option>
                                          ):(
                                            <>
                                            </>
                                          )


                                    ))
                                      }
                                </li>
                                <li>
                                  <button onClick={(e)=>setEditAssignToHandler(e,task)}>Edit Assign To</button>
                                </li>
                                </>
                              )






                            }



                            </>

                        ))
                        }
                      </ul>

                    </li>
                  </ul>
                  )}
                  </>
                ))
              }
            </div>
            <form className="projectForm" id="project" onSubmit={handleProjectSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label style={{display:'block'}}  htmlFor="task">Add tasks:</label>
                    <select
                        name="task"
                        multiple // Allow multiple selection
                        value={selectedTasks}
                        onChange={handleTaskChange}
                    >
                        {Array.isArray(tasks)?(tasks.map((task) => (
                            <option key={task.id} value={task.id}>{task.title}</option>
                        ))):(<></>)}
                    </select>
                </div>
                <button type="submit">Create Project</button>
            </form>
            {showProjPopup && <div className={`popup ${showProjPopup ? 'fade-out' : ''}`}>Project Created</div>}
        </>
    );
}

export default Project;
