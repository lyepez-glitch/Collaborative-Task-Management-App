import { useState, useEffect } from 'react';
import axios from 'axios';

function Project({ token,setUsers }) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [projects,setProjects] = useState([]);
    const [edit,setEdit] = useState(false);
    const [editedName,setEditedName] = useState('');
    const [editedDescription,setEditedDescription] = useState('');
    const [editedSelectedTasks,setEditedSelectedTasks] = useState('');
    const [editedStatus,setEditedStatus] = useState('');
    const [editStatus,setEditStatus,] = useState('');
    const handleEditStatusSubmit = async (e)=>{
      e.preventDefault();
      const taskData = {
        status:editedStatus
      }
      try{
        const { data } = await axios.put(`http://localhost:3000/tasks/editStatus/${editStatus}`, taskData, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
          });

          console.log('edited task status response:', data);
          const tasksResponse = await axios.get('http://localhost:3000/tasks');
          console.log('fetched tasks', tasksResponse.data);
          setTasks(tasksResponse.data);
          const projectsResponse = await axios.get('http://localhost:3000/projects');
          console.log('fetched projects', projectsResponse.data);
          setProjects(projectsResponse.data);
          setEditStatus('');
      }catch(error){
        console.error('Error updating task status:', error.message);
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
          const { data } = await axios.put(`http://localhost:3000/projects/edit/${edit}`, projectData, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
          });

          console.log('edited project response:', data);
          const response = await axios.get('http://localhost:3000/projects');
          console.log('fetched projects', response.data);
          setProjects(response.data);
          // const userResponse = await axios.get('http://localhost:3000/users');
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

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/tasks');
                console.log('fetched tasks', response.data);
                setTasks(response.data.tasks);
            } catch (error) {
                console.log('err', error);
            }
        };
        fetchTasks();

        const fetchProjects = async () => {
          try {
              const response = await axios.get('http://localhost:3000/projects');
              console.log('fetched projects', response.data);
              setProjects(response.data);
          } catch (error) {
              console.log('err', error);
          }
      };
      fetchProjects();

    }, []);

    const handleProjectSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            name,
            description: desc,
            task: selectedTasks // Pass selected tasks
        };

        try {
            const { data } = await axios.post(`http://localhost:3000/projects`, projectData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('project response:', data);
            const response = await axios.get('http://localhost:3000/projects');
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

            <div>
              <h3>Projects: </h3>
              {
                projects && projects.map((proj) => (
                  <>
                  {edit === proj.id?(
                    <form id="editProject" onSubmit={(e)=>handleEditSubmit(e)}>
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
                    <ul>
                    <li>Name:{proj.name}</li>
                    <li>Description:{proj.description}</li>
                    <button onClick={(e)=>{handleProjectEdit(e,proj.id,proj.name,proj.description,proj.tasks)}}>Edit</button>

                    <li>
                      <ul>
                        <li>
                          Tasks:
                        </li>
                        <div>
                          {
                          proj.tasks?(
                            <div class="kanban-board">

                            <div class="column">
                              <h2>To Do</h2>
                            {
                              proj.tasks
                                .filter((task) => task.status === 'To Do')
                                .map((task, index) => (
                                  <div key={index}>Task: {task.title}</div>
                                ))
                            }

                            </div>
                            <div class="column">
                                <h2>In Progress</h2>
                                {
                              proj.tasks
                                .filter((task) => task.status === 'In Progress')
                                .map((task, index) => (
                                  <div key={index}>Task: {task.title}</div>
                                ))
                            }

                            </div>
                            <div class="column">
                                <h2>Done</h2>
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
                        proj.tasks && proj.tasks.map(({ id,title,dueDate,status }, index) => (
                            <>
                            <li key={index}>task: {title}</li>
                            {editStatus === id?(
                              <form onSubmit={(e)=>handleEditStatusSubmit(e)}>
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
                              <li>Status:{status}</li>
                              <li>
                                <button onClick={(e)=>handleStatusEdit(e,id,status)}>Edit Status</button>
                              </li>
                              </>

                            )}



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
            <form id="project" onSubmit={handleProjectSubmit}>
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
                    <label htmlFor="task">Add tasks:</label>
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
        </>
    );
}

export default Project;
