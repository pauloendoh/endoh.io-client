import { ResourceDto, newResourceDto } from '../../dtos/relearn/ResourceDto';
import { relearnActionTypes } from './relearnTypes';
import { action } from 'typesafe-actions';
import { TagDto, newTagDto } from '../../dtos/relearn/TagDto';

export const setResources = (resources: ResourceDto[]) =>
  action(relearnActionTypes.SET_RESOURCES, resources)
export const setTags = (tags: TagDto[]) => action(relearnActionTypes.SET_TAGS, tags)


export const removeResource = (id: number) =>
  action(relearnActionTypes.REMOVE_RESOURCE, id)
export const removeTag = (id: number) =>
  action(relearnActionTypes.REMOVE_TAG, id)

export const startNewResource = () =>
  action(relearnActionTypes.SET_EDITING_RESOURCE, newResourceDto())
export const editResource = (resource: ResourceDto) =>
  action(relearnActionTypes.SET_EDITING_RESOURCE, resource)
export const closeResourceDialog = () => action(relearnActionTypes.SET_EDITING_RESOURCE, null)

export const startNewTag = () =>
  action(relearnActionTypes.SET_EDITING_TAG, newTagDto())
export const editTag = (tag: TagDto) =>
  action(relearnActionTypes.SET_EDITING_TAG, tag)
export const closeTagDialog = () => action(relearnActionTypes.SET_EDITING_TAG, null)

// PE 2/3 - Perigo da pessoa esquecer de colocar aqui....
export type RelearnActionReturns =
  ReturnType<typeof setResources> |
  ReturnType<typeof setTags> |

  ReturnType<typeof removeResource> |
  ReturnType<typeof removeTag> |

  ReturnType<typeof startNewResource> |
  ReturnType<typeof editResource> |
  ReturnType<typeof closeResourceDialog> |

  ReturnType<typeof startNewTag> |
  ReturnType<typeof editTag> |
  ReturnType<typeof closeTagDialog>


