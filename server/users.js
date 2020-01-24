const users = [];

const addUser = ({ id, name }) => {
  name = name.trim().toLowerCase();

  const existingUser = users.find((user) => user.name === name);

  if (!name) return { error: 'Username is required.' };

  const user = { id: id, name: name, active: true };

  if (!existingUser) {
    users.push(user);
   } else {
    const index = users.findIndex((user) => user.name === name);
    if(index !== -1) {
      users[index].active = true;
    } 
   }

  return { user };
}

const deactivateUser = (name) => {
  const index = users.findIndex((user) => user.name === name);

  if(index !== -1) {
    users[index].active = false;
    return users[index];
  } 
}

const isLoggedIn = (name) => {
  const existingUser = users.find((user) => user.name === name);
  if(existingUser && existingUser.active){
    return true;
  }

  return false;
}

const getAllUsers = () => {  return users };

module.exports = { addUser, isLoggedIn, deactivateUser, getAllUsers };