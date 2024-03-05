import {Router} from 'express'
const router = Router()
import * as controller from '../controllers/appController.js'
/** POST Methods */
router.route('/registerstudent').post(controller.registerstudent)

/** GET Methods */
router.route('/students').get(controller.getStudent) // student with username


/** PUT Methods */
router.route('/updatestudent').put(controller.updatestudent); // is use to update the student profile

/** DELETE Methods */
router.route('/deletestudent').delete(controller.deletestudent); // is use to update the student profile

export default router