import path from 'path';
import uniqueSlug from 'unique-slug';

import { FRONTEND_PUBLIC_FOLDER } from '../config';
import { AuthUserInput, EventInput, GroupInput, LocationInput, UserInput } from '../types';

export function createEventInput(event: EventInput) {
  return {
    name: getValue(event.name),
    summary: getValue(event.summary),
    description: getValue(event.description),
    image_filepath: getValue(event.image_filepath),
    start_datetime: getValue(event.start_datetime),
    end_datetime: getValue(event.end_datetime),
    capacity: getValue(event.capacity),
    allow_waitlist: getValue(event.allow_waitlist),

    author_id: getValue(event.author_id),
    group_id: getValue(event.group_id),
    location_id: getValue(event.location_id),
  };
}

export function createLocationInput(location: LocationInput) {
  return {
    id: getValue(location.id),
    country: getValue(location.country),
    city: getValue(location.city),
    street_name: getValue(location.street_name),
    street_number: getValue(location.street_number),
    latitude: getValue(location.latitude),
    longitude: getValue(location.longitude),
  };
}

export function createUserInput(user: UserInput) {
  return {
    id: getValue(user.id),
    email: getValue(user.email),
    first_name: getValue(user.first_name),
    last_name: getValue(user.last_name),
    verified: getValue(user.verified),
    location_id: getValue(user.location_id),
    description: getValue(user.description),
  };
}

export function createAuthUserInput(user: AuthUserInput) {
  return {
    id: getValue(user.id),
    email: getValue(user.email),
    password: getValue(user.password),
    first_name: getValue(user.first_name),
    last_name: getValue(user.last_name),
    verified: getValue(user.verified),
    location_id: getValue(user.location_id),
    description: getValue(user.description),
  };
}
export function createGroupInput(group: GroupInput) {
  return {
    id: getValue(group.id),
    name: getValue(group.name),
    summary: getValue(group.summary),
    description: getValue(group.description),
    admin_id: getValue(group.admin_id),
    image_filepath: getValue(group.image_filepath),
    location_id: getValue(group.location_id),
  };
}

function getValue<Type>(input: Type) {
  return input ? input : undefined;
}

function safeFilenameString(rawFilename: string): string {
  return rawFilename.replaceAll(/[^A-Za-z0-9]/g, '-');
}

export const getPublicStorageFilePath = ({
  filename,
  relativeDirectory,
}: {
  filename: string;
  relativeDirectory: string;
}) => {
  const { name, ext } = path.parse(filename);

  const uniqueFilename = `${safeFilenameString(name).slice(0, 50)}-${safeFilenameString(uniqueSlug())}${ext}`;

  const fileDirectoryPath = path.resolve(FRONTEND_PUBLIC_FOLDER, relativeDirectory);

  return {
    fileDirectoryPath,
    filePath: path.join(fileDirectoryPath, uniqueFilename),
    relativeFileUrl: `/${path.join(relativeDirectory, uniqueFilename).split(path.sep).join('/')}`,
  };
};
