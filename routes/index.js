'use strict';

import admin from './admin'
import md from './md'
import tag from './tag'

export default app => {
  app.use('/api/admin', admin)
  app.use('/api/md', md),
  app.use('/api/tag', tag)
}