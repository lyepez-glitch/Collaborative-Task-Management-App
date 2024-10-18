import { useState } from 'react';
import axios from 'axios';

function Profile({ setUser, token,setUsers,users,user }) {
    const [edit, setEdit] = useState(null);
    const [editedPassword, setEditedPassword] = useState('');
    const [editedUsername, setEditedUsername] = useState('');
    const [editedFirstName, setEditedFirstName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedProfileImage, setEditedProfileImage] = useState(null); // Store the file object

    const handleEdit = (id) => {
        setEdit(id);
        setEditedUsername(user.username);
        setEditedFirstName(user.firstName);
        setEditedLastName(user.lastName);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Create a FormData object
        formData.append('editedName', editedUsername);
        formData.append('editedFirstName', editedFirstName);
        formData.append('editedLastName', editedLastName);
        formData.append('editedPassword', editedPassword);
        if (editedProfileImage) {
            formData.append('editedProfileImage', editedProfileImage); // Append the file
        }

        try {
            const { data } = await axios.post(`http://localhost:3000/users/edit/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the header for file upload
                    'Authorization': `Bearer ${token}`,
                },
            });
            setEdit(null);
            console.log('User response:', data);
            setUser(data); // Update the user state with the response data
            const response = await axios.get('http://localhost:3000/users');
            console.log('fetched users',response.data);
            setUsers(response.data);


        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <>
            {edit === user.id ? (
                <form className="editProfileForm" id="editProfile" encType="multipart/form-data" onSubmit={handleEditSubmit}>
                    <h3>Edit</h3>
                    <div>
                        <label htmlFor="editedName">Edit username:</label>
                        <input
                            type="text"
                            id="editedName"
                            name="editedName"
                            value={editedUsername}
                            onChange={(e) => setEditedUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="editedFirstName">Edit firstname:</label>
                        <input
                            type="text"
                            id="editedFirstName"
                            name="editedFirstName"
                            value={editedFirstName}
                            onChange={(e) => setEditedFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="editedLastName">Edit lastname:</label>
                        <input
                            type="text"
                            id="editedLastName"
                            name="editedLastName"
                            value={editedLastName}
                            onChange={(e) => setEditedLastName(e.target.value)}
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
                            onChange={(e) => setEditedPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="editedProfileImage">Edit profile image:</label>
                        <input
                            type="file"
                            id="editedProfileImage"
                            name="editedProfileImage"
                            onChange={(e) => setEditedProfileImage(e.target.files[0])} // Get the file directly
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <>
                    <div className="user">
                    <div class="username">Username: {user.username}</div>
                    <div>First Name: {user.firstName}</div>
                    <div>Last Name: {user.lastName}</div>
                    <div>Role: {user.role}</div>
                    <div>Profile Image: <img style={{width: '100px',height:'100px'}} src={'http://localhost:3000/' + user.profileImage} alt="" /></div>
                    <button className="editProfileBtn" onClick={() => handleEdit(user.id)}>Edit Profile</button>
                    </div>

                </>
            )}
        </>
    );
}

export default Profile;
