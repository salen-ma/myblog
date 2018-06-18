'use strict';

import express from 'express'
import Tag from '../controller/tag/tag'
const router = express.Router()

router.post('/addTag', Tag.addTag);


export default router