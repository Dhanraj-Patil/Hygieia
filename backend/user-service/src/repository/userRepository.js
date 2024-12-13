const {User} = require('../config/mongoose')
const logger = require('../config/logger')

const create = async (data)=>{
    try {
        const user = new User(data)
        await user.save()
    } catch (error) {
        logger.error(`Creating user record to database failed. Reason: ${error}`)
        throw error
    }
}

const getAll = async () => {
    try {
        return await User.find().exec()
    } catch (error) {
        logger.error(`Fetching all user records from the database failed. Reason: ${error}`)
    }
}

const getBy = async (email) => {
    try {
        return await User.findOne({email: email}).exec()
    } catch (error) {
        logger.error(`Fetching user by email-id failed. Reason: ${error}`)
    }
}

const deleteBy = async (email) => {
    try {
        await User.deleteOne({emal: email})
    } catch (error) {
        logger.error(`User deletion failed. Reason: ${error}`)
    }
}

const update = async (id, data) => {
    try {
        await User.updateOne({_id: id}, data)
    } catch (error) {
        logger.error(`User updation failed. Reason: ${error}`)
    }
}
module.exports = {create, getAll, getBy, deleteBy}