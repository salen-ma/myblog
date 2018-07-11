'use strict';

import express from 'express'
import Tag from '../controller/tag/tag'
const router = express.Router()

router.post('/addTag', Tag.addTag);
router.get('/getTags', Tag.getTags);

export default router