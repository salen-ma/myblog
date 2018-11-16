import { LXHR } from "../xhr"

export const geMdList = params => LXHR.GET('/api/md/getmdlist')
export const geMd = params => LXHR.GET('/api/md/getmd', params)
export const readMd = params => LXHR.GET('/api/md/readmd', params)
export const saveMd = params => LXHR.POST('/api/md/savemd', params)
export const createMd = params => LXHR.POST('/api/md/createmd', params)
export const uploadImg = data => LXHR.UPLOAD('/api/md/uploadimg', data)