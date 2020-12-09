import { ResourceDto, newResourceDto } from '../../dtos/relearn/ResourceDto';
import { relearnActionTypes } from './relearnTypes';
import { action } from 'typesafe-actions';
import { TagDto } from '../../dtos/relearn/TagDto';

export const setResources = (resources: ResourceDto[]) =>
  action(relearnActionTypes.SET_RESOURCES, resources)
export const setTags = (tags: TagDto[]) => action(relearnActionTypes.SET_TAGS, tags)

export const startNewResource = () =>
  action(relearnActionTypes.SET_EDITING_RESOURCE, newResourceDto())
export const editResource = (resource: ResourceDto) =>
  action(relearnActionTypes.SET_EDITING_RESOURCE, resource)
export const closeResourceDialog = () => action(relearnActionTypes.SET_EDITING_RESOURCE, null)

// PE 2/3 - Perigo da pessoa esquecer de colocar aqui....
export type RelearnActionReturns =
  ReturnType<typeof setResources> |
  ReturnType<typeof setTags> |
  ReturnType<typeof startNewResource> |
  ReturnType<typeof editResource> |
  ReturnType<typeof closeResourceDialog>


