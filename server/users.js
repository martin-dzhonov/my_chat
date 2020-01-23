const users = [];

const addUser = ({ id, name }) => {
  name = name.trim().toLowerCase();

  const existingUser = users.find((user) => user.name === name);

  if(!name) return { error: 'Username is required.' };

  const user = { id: id, name: name, active: true };

  if (!existingUser) { 
    users.push(user);
   };

  return { user };
}

const deactivateUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) {
    users[index].active = false;
    return users[index];
  } 
}

const getUser = (id) => users.find((user) => user.id === id);

const getAllUsers = () => {  return users };


module.exports = { addUser, getUser, deactivateUser, getAllUsers };