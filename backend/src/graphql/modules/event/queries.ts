export const createEventQuery = ({ single }: { single?: boolean } = {}) => `
SELECT 
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'id', t.id, 'name', t.name, 'author', 
      t.author, 'location', t.location, 
      'eventTypes', t.eventTypes, 'summary', 
      t.summary, 'description', t.description, 
      'image_filepath', t.image_filepath, 
      'start_datetime', t.start_datetime, 
      'end_datetime', t.end_datetime
    )
  ) 
FROM 
  (
    SELECT 
      event.id, 
      event.name, 
      event.summary, 
      event.description, 
      event.image_filepath, 
      DATE_FORMAT(event.start_datetime, '%Y-%m-%dT%H:%i:%sZ') as start_datetime, 
      DATE_FORMAT(event.end_datetime, '%Y-%m-%dT%H:%i:%sZ') as end_datetime, 
      JSON_OBJECT(
        'id', user.id, 'name', user.name, 'email', 
        user.email
      ) as author, 
      CONCAT(
        '[', 
        GROUP_CONCAT(
          JSON_OBJECT(
            'id', eventType.id, 'name', eventType.name, 
            'logo_filepath', eventType.logo_filepath
          )
        ), 
        ']'
      ) AS eventTypes, 
      JSON_OBJECT(
        'id', location.id, 'country', location.country, 
        'city', location.city, 'street_name', 
        location.street_name, 'street_number', 
        location.street_number, 'additional_information', 
        location.additional_information, 
        'latitude', location.latitude, 'longitude', 
        location.longitude
      ) as location 
    FROM 
      Event event 
      JOIN User user ON event.author_id = user.id 
      JOIN Event_EventType event_eventType ON event_eventType.event_id = event.id 
      JOIN EventType eventType ON event_eventType.event_type_id = eventType.id 
      JOIN Location location ON event.location_id = location.id 
    GROUP BY 
      event.id 
    ${single ? `HAVING event.id = ?` : ''}
  ) as t
`;

