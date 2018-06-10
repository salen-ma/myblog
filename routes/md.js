'use strict';

import express from 'express'
import Markdown from '../controller/md/md'
const router = express.Router()

router.get('/getmd', Markdown.read);
router.get('/getmdlist', Markdown.getMd);
router.post('/savemd', Markdown.save);
router.post('/createmd', Markdown.create);
router.get('/readmd', Markdown.readMd);
router.post('/uploadimg', Markdown.upload);

export default router