import { LXHR } from "../xhr"

export const createTag = params => LXHR.POST('http://localhost:8899/api/tag/addTag', params)