import { gql } from '../../gql';

export const CREATE_GROUP = gql(`
  mutation CreateGroup($group: GroupInput!, $location: LocationInputWithoutCoords!) {
    createGroup(group: $group, location: $location) {
      id
    }
  }
`);

export const EDIT_GROUP = gql(`
  mutation EditGroup($group: GroupInput!, $location: LocationInputWithoutCoords!) {
    editGroup(group: $group, location: $location) {
      id
    }
}
`);

export const DELETE_GROUP = gql(`
  mutation DeleteGroup($groupId: Int!, $locationId: Int!) {
    deleteGroup(group_id: $groupId, location_id: $locationId) 
  }
`);

export const UPLOAD_GROUP_IMAGE = gql(`
  mutation UploadGroupImage($groupImage: Upload) {
    uploadGroupImage(group_image: $groupImage)
}
`);

