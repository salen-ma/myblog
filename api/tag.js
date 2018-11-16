import { LXHR } from "../xhr"

export const createTag = params => LXHR.POST('/api/tag/addTag', params)
export const getTags = params => LXHR.GET('/api/tag/getTags', params)