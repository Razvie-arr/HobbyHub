import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';
import { match } from 'ts-pattern';

import { getLocationFragmentData } from '../../../types';

import { DataMapProps, MapData, MultipleDataMapProps, SingleDataMapProps } from './types';

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

export const SingleDataMap = <T extends MapData>({ data }: SingleDataMapProps<T>) => {
  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const location = getLocationFragmentData(data.location);
  const position = { lat: location.latitude, lng: location.longitude };
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

export const MultipleDataMap = <T extends MapData>(props: MultipleDataMapProps<T>) => {
  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<T>();
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      onLoad={(map) => {
        setMapRef(map);
        const bounds = new google.maps.LatLngBounds();
        props.data.forEach((dataPoint) => {
          const location = getLocationFragmentData(dataPoint.location);
          return bounds.extend({ lat: location.latitude, lng: location.longitude });
        });
        map.fitBounds(bounds);
      }}
      onClick={() => setIsOpen(false)}
    >
      {props.data.map((dataPoint, index) => {
        const location = getLocationFragmentData(dataPoint.location);
        const position = { lat: location.latitude, lng: location.longitude };
        return (
          <MarkerF
            key={index}
            position={position}
            onClick={() => {
              mapRef?.panTo(position);
              setInfoWindowData(dataPoint);
              setIsOpen(true);
            }}
          >
            {isOpen && infoWindowData?.id === dataPoint.id && (
              <InfoWindowF
                onCloseClick={() => {
                  setIsOpen(false);
                }}
              >
                {props.renderMarkerContent(dataPoint)}
              </InfoWindowF>
            )}
          </MarkerF>
        );
      })}
    </GoogleMap>
  );
};

export const DataMap = <T extends MapData>({ height = '79vh', ...other }: DataMapProps<T>) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  return (
    <Box h={height} w="100%" borderRadius="base">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        match(other)
          .with({ type: 'single' }, (props) => <SingleDataMap {...props} />)
          .with({ type: 'multiple' }, (props) => <MultipleDataMap {...props} />)
          .exhaustive()
      )}
    </Box>
  );
};

