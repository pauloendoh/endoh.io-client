import { ResourceDto } from '../../dtos/relearn/ResourceDto';
import { Reducer } from 'redux';
import { RelearnActionReturns } from './relearnActions';
import { relearnActionTypes, RelearnState } from './relearnTypes';
import { sleep } from '../../utils/sleep'

const INITIAL_STATE: RelearnState = {
  resources: [],
  tags: [],

  editingResource: null,
  editingTag: null,
}

const relearnReducer: Reducer<RelearnState, RelearnActionReturns> = (state = INITIAL_STATE, action: RelearnActionReturns): RelearnState => {
  switch (action.type) {
    case relearnActionTypes.SET_RESOURCES:
      return { ...state, resources: action.payload }
    case relearnActionTypes.SET_TAGS:
      return { ...state, tags: action.payload }
    case relearnActionTypes.REMOVE_RESOURCE:
      return removeResource(state, action.payload)
    case relearnActionTypes.REMOVE_TAG:
      return removeTag(state, action.payload)
    case relearnActionTypes.SET_EDITING_RESOURCE:
      return setEditingResource(state, action.payload)
    case relearnActionTypes.SET_EDITING_TAG:
      return { ...state, editingTag: action.payload }

    default:
      return { ...state }
  }
}

const setEditingResource = (state: RelearnState, resource: ResourceDto): RelearnState => {
  return { ...state, editingResource: resource }
}

const removeResource = (state: RelearnState, id: number): RelearnState => {
  // remove from resources, and from tags
  const resources = [...state.resources].filter(resource => resource.id !== id)
  const tags = [...state.tags].map(tag => {
    tag.resources = tag.resources.filter(resource => resource.id !== id)
    return tag
  })

  return { ...state, resources, tags }
}

const removeTag = (state: RelearnState, id: number): RelearnState => {
  // remove tag and resources from that tag

  const tag = state.tags.find(t => t.id === id)
  const resourcesIds = tag.resources.map(r => r.id) // Resources which will be removed

  const resources = [...state.resources].filter(r => !resourcesIds.includes(r.id))
  const tags = [...state.tags].filter(t => t.id !== id)

  return { ...state, resources, tags }
}


export default relearnReducer