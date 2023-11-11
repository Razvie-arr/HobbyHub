import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';

import { EventProps, WithEvent, WithNonEmptyEvents } from '../../../../shared/types';
import { EventCard } from '../EventCard/EventCard';

interface EventsMapProps extends WithNonEmptyEvents {
  height?: string;
}

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

export const SingleEventMap = ({ event }: WithEvent) => {
  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const position = { lat: event.location.latitude, lng: event.location.longitude };
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={16}
      center={position}
      onLoad={(map) => {
        setMapRef(map);
      }}
    >
      <MarkerF
        position={position}
        onClick={() => {
          mapRef?.panTo(position);
        }}
      />
    </GoogleMap>
  );
};

export const MultipleEventsMap = ({ events }: WithNonEmptyEvents) => {
  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<EventProps>();
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      onLoad={(map) => {
        setMapRef(map);
        const bounds = new google.maps.LatLngBounds();
        events.forEach(({ location }) => bounds.extend({ lat: location.latitude, lng: location.longitude }));
        map.fitBounds(bounds);
      }}
      onClick={() => setIsOpen(false)}
    >
      {events.map(({ location, ...rest }, index) => {
        const position = { lat: location.latitude, lng: location.longitude };
        return (
          <MarkerF
            key={index}
            position={position}
            onClick={() => {
              mapRef?.panTo(position);
              setInfoWindowData({ location, ...rest });
              setIsOpen(true);
            }}
          >
            {isOpen && infoWindowData?.id === rest.id && (
              <InfoWindowF
                onCloseClick={() => {
                  setIsOpen(false);
                }}
              >
                <EventCard event={infoWindowData} simplified />
              </InfoWindowF>
            )}
          </MarkerF>
        );
      })}
    </GoogleMap>
  );
};

export const EventsMap = ({ height = '79vh', events }: EventsMapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  return (
    <Box h={height} w="100%" borderRadius="base">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : events.length > 1 ? (
        <MultipleEventsMap events={events} />
      ) : (
        <SingleEventMap event={events[0]} />
      )}
    </Box>
  );
};

