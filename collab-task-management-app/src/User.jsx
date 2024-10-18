import Task from './Task';

function User({users,token,setUsers}){

  const formatDate = (date) => {
    if (!date) return 'No due date';
    // Example formatting: "October 8, 2024"
    const formattedDueDate = date ? new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  }) : 'No due date';
    return formattedDueDate;
};
  return(
    <>

    <Task setUsers={setUsers} token={token} users={users}/>
    <div className="usersContainer">
    {
      users && users.map(({id,username,firstName,lastName,tasksAssigned}) => (
        <>
        <div>
          <ul className="userEle">
            <li>{username}</li>
            <li>{firstName}</li>
            <li>{lastName}</li>

            <li>
              <ul>
                <li>
                  Tasks:
                </li>

                {
                tasksAssigned && tasksAssigned.map(({ title,dueDate }, index) => (
                    <>
                    <div className= "userTask">
                      <li  key={index}>task: {title}</li>
                      <li>due: {formatDate(dueDate)}</li>
                    </div>

                    </>

                ))
                }
              </ul>
            </li>
          </ul>
        </div>

        </>
      ))
    }
    </div>


    </>
  )
}
export default User;