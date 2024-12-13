const expertRepository = require('../repository/expertRepository')

const create = async (expert)=>{
    await expertRepository.create(expert)
}

const update = async (id, expert)=>{
    expert["updatedOn"] = new Date()
    await expertRepository.update(id, expert)
}

const deleteBy = async (id)=>{
    await expertRepository.deleteBy(id)
}

const check = async (expertId)=>{
    const expert = await expertRepository.getBy(expertId)
    if(expert != null) return true
    else return false
}

const getAll = async ()=>{
    return await expertRepository.getAll()
}

const getBy = async (id)=>{
    const expert = await expertRepository.getBy(id)
    return expert
}

module.exports = {create, update, deleteBy, check, getAll, getBy}