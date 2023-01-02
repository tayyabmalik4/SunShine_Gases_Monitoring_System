import express from 'express'

import {loginController, signupController } from '../Controller/loginController.js';

import { machinePostController , machineGetController } from '../Controller/machineController.js';

import {meterGetController} from '../Controller/meterController.js'

import DummyValPostController from '../Controller/DummyValController.js'

var router = express.Router();

// login Routes
router.post('/signup',signupController);
router.post('/login',loginController);

// Machine Routes
router.post('/machinepost', machinePostController)
router.get('/machineget', machineGetController)

// Meter Routes
router.post('/meterGet',meterGetController)

// Dummy Value Router
router.post('/dummyValPost', DummyValPostController);


export default router;