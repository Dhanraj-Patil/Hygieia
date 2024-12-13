const express = require('express')
const logger = require('../config/logger')
const router = express.Router()
const Util = require('../services/util')

router.get('/check', async (req, res) => {
    const id = req.query.id

    logger.info(`Verifying ID: ${id}`)

    // res.status(200).json({'type': 'user'})

    try {
        const type = await Util.verify(id)

        // res.status(200).json({
        //     "type": "user",
        //     "data": {
        //         "dob": "2024-10-22T18:30:00.000Z",
        //         "gender": "male",
        //         "email": "dhanraj68349@gmail.com",
        //         "phone": "9607008909",
        //         "country": "India",
        //         "state": "Maharashtra",
        //         "firstName": "Dhanraj",
        //         "lastName": "Patil",
        //         "phonePrefix": "+91",
        //         "language": "English"
        //     }
        // })

        // res.json({"type": "404"})

        // res.status(200).json({
        //     "type": "expert",
        //     "data": {
                
        //     }
        // })

        if (type === null) {
            res.json({ "type": "404" })
        } else {
            if (type.type === 'user') {
                res.status(200).json(type)
            } else if (type.type === 'expert') {
                res.status(200).json(type)
            }
        }

    } catch (error) {
        logger.error(error)
        res.status(500).json({ "type": "error" })
    }
})

module.exports = router