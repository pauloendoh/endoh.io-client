import { Reducer } from 'redux';
import API from '../../consts/API';
import MY_AXIOS from '../../consts/MY_AXIOS';
import { ResourceDto } from '../../interfaces/dtos/relearn/ResourceDto';
import { IMoveResource } from '../../interfaces/relearn/IMoveResource';
import { RelearnActionReturns } from './relearnActions';
import { relearnActionTypes, RelearnState } from './relearnTypes';

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
    case relearnActionTypes.MOVE_RESOURCE:
      return moveResource(state, action.payload)

    case relearnActionTypes.CLEAR_RELEARN_REDUCER:
      return { ...INITIAL_STATE }
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

const moveResource = (state: RelearnState, params: IMoveResource): RelearnState => {
  // get uncompleted resources from tag
  let resources = state.resources.filter(resource => {
    if (params.tagId === null && resource.tag === null) return true
    if (params.tagId === resource.tag?.id) return true
    return false
  }).filter(resource => resource.completedAt.length === 0)

  // sort them by position
  resources = resources.sort(
    (resourceA, resourceB) => resourceA.position - resourceB.position
  )

  // give each position its index
  resources = resources.map((resource, index) => {
    resource.position = index
    return resource
  })

  // do splices
  const dragged = resources[params.fromIndex]
  resources.splice(params.fromIndex, 1)
  resources.splice(params.toIndex, 0, dragged)

  // give each position its index
  resources = resources.map((resource, index) => {
    resource.position = index
    return resource
  })

  // concat to the other resources
  const resourcesIds = resources.map(resource => resource.id)
  const otherResources = state.resources.filter(resource => !resourcesIds.includes(resource.id))

  resources = otherResources.concat(resources)

  MY_AXIOS.post(API.relearn.resource + '/resources', resources)
    .then(res => {

    })
  return { ...state, resources }
}



export default relearnReducer