import express from 'express'
import { getbetweendate} from '../Controller/findDateController.js'

import {loginController, signupController } from '../Controller/loginController.js';

import {meterGetController, meterPostController} from '../Controller/meterController.js'

var router = express.Router();

// login Routes
router.post('/signup',signupController);
router.post('/login',loginController);

// Meter Routes
router.post('/meterPost',meterPostController)
router.post('/meterGet',meterGetController)

// find the data from dates
router.post('/finddate',getbetweendate);

export default router;