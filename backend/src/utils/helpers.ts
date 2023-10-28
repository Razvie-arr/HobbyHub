import { EventInput, LocationInput, UserInput } from '../types';

export function createEventInput(event: EventInput) {
  return {
    name: getValue(event.name),
    summary: getValue(event.summary),
    description: getValue(event.description),
    image_filePath: getValue(event.image_filePath),
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
    name: getValue(user.name),
    verified: getValue(user.verified),
    location_id: getValue(user.location_id),
    description: getValue(user.description),
  };
}

function getValue<Type>(input: Type) {
  return input ? input : undefined;
}
