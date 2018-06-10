'use strict';

import admin from './admin'
import md from './md'

export default app => {
  app.use('/api/admin', admin)
  app.use('/api/md', md)
}