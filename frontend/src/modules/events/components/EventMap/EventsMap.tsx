import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';

import { EventProps, WithEvents } from '../../types';
import { EventCard } from '../EventCard/EventCard';

export const EventsMap = (props: WithEvents) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<EventProps>();

  return (
    <Box h="79vh" w="100%" borderRadius="base">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerStyle={{
            height: '100%',
            width: '100%',
          }}
          onLoad={(map) => {
            setMapRef(map);
            const bounds = new google.maps.LatLngBounds();
            props.events.forEach(({ location }) => bounds.extend({ lat: location.latitude, lng: location.longitude }));
            map.fitBounds(bounds);
          }}
          onClick={() => setIsOpen(false)}
        >
          {props.events.map(({ location, ...rest }, index) => {
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
      )}
    </Box>
  );
};

