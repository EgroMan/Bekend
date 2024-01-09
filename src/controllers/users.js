const User = require('../models/user')

const getUsers = (request, response) =>{
  // Get all users
}

const getUser = (request, response) =>{
  const {user_id} = request.params;
    response.status(200);
    response.send(`user id: ${user_id}`);
}
const createUser = (request, response) =>{
  return User.create ({...request.body}).then(
    (user) => {response.status(201).send(user)}
  )
}
const updateUser = (request, response) =>{
  // update user
}
const deleteUser = (request, response) =>{
  // delete user
}

module.exports ={
  getUsers,
  getUser ,
  createUser,
  updateUser,
  deleteUser,
}