import { LXHR } from "../xhr"

export const geMdList = params => LXHR.GET('http://localhost:8899/api/md/getmdlist')
export const geMd = params => LXHR.GET('http://localhost:8899/api/md/getmd', params)
export const readMd = params => LXHR.GET('http://localhost:8899/api/md/readmd', params)
export const saveMd = params => LXHR.POST('http://localhost:8899/api/md/savemd', params)
export const createMd = params => LXHR.POST('http://localhost:8899/api/md/createmd', params)
export const uploadImg = data => LXHR.UPLOAD('http://localhost:8899/api/md/uploadimg', data)