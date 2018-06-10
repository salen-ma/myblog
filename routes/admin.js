'use strict';

import express from 'express';
import Admin from '../controller/admin/admin';
const router = express.Router();

router.get('/login/:user_name?/:password?', Admin.login);

export default router;