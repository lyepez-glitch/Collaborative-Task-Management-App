import { useState } from 'react'
import axios from 'axios'

function Profile({user,setUser,users,setUsers}){
  const [edit,setEdit] = useState(false);
  const [editedPassword,setEditedPassword] = useState('');
  const [editedUsername,setEditedUsername] = useState('');
  const [editedFirstName,setEditedFirstName] = useState('');
  const [editedLastName,setEditedLastName] = useState('');
  const [editedProfileImage,setEditedProfileImage] = useState('');


  const handleEditSubmit = async(e)=>{
    e.preventDefault();

    const {data} = await axios.post('http://localhost:3000/user/edit', document.querySelector('#editProfile'), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const response = await axios.get('http://localhost:3000/user');
    setUser(response.data);

  }
  return (
    <>
    {
      edit?(
        <form id="editProfile" onSubmit={handleEditSubmit}>
          <h3>Edit</h3>
          <div>
            <label htmlFor="name">Edit username:</label>
            <input
              type="text"
              id="editedName"
              name="editedName"
              value={editedUsername}
              onChange={(e)=>setEditedUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Edit firstname:</label>
            <input
              type="text"
              id="editedFirstName"
              name="editedFirstName"
              value={editedFirstName}
              onChange={(e)=>setEditedFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Edit lastname:</label>
            <input
              type="text"
              id="editedLastName"
              name="editedLastName"
              value={editedLastName}
              onChange={(e)=>setEditedLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="editedPassword">Edit password:</label>
            <input
              type="password"
              id="editedPassword"
              name="editedPassword"
              value={editedPassword}
              onChange={(e)=>setEditedPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="editedProfileImage">Edit profile image:</label>
            <input
              type="file"
              id="editedProfileImage"
              name="editedProfileImage"
              value={editedProfileImage}
              onChange={(e)=>setEditedProfileImage(e.target.value)}
              required
            />
          </div>

          <button type="submit">Submit</button>
    </form>

      ):(
        <>
        <div>Username: {user.username}</div>
        <div>First Name: {user.firstName}</div>
        <div>Last Name: {user.lastName}</div>
        <div>Role: {user.role}</div>
        <div>Profile Image: <img src={user.profileImage} alt="" /></div>
        </>


      )
    }

    </>
  )
}
export default Profile;