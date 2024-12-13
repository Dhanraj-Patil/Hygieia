const userRepository = require('../repository/userRepository')

const create = async (user)=>{
    await userRepository.create(user)
}

const update = async (id, user)=>{
    user["updatedOn"] = new Date()
    await userRepository.update(id, user)
}

const deleteBy = async (id)=>{
    await userRepository.deleteBy(id)
}

const check = async (userId)=>{
    const user = await userRepository.getBy(userId)
    if(user != null) return true
    else return false
}

const getAll = async ()=>{
    return await userRepository.getAll()
}

const getBy = async (id)=>{
    return await userRepository.getBy(id)
}

module.exports = {create, update, deleteBy, check, getAll, getBy}