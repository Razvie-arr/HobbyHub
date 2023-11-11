import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';
import { match } from 'ts-pattern';

import { route } from '../../../../route';
import { DataCard } from '../DataCard';

import { MapData, MapDataArray } from './types';

interface MapProps {
  height?: string;
  mapDataArray: MapDataArray;
}

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

export const SingleMapData = (props: MapData) => {
  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const position = { lat: props.data.location.latitude, lng: props.data.location.longitude };
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

export const MultipleMapDatas = (props: MapDataArray) => {
  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<MapData>();
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      onLoad={(map) => {
        setMapRef(map);
        const bounds = new google.maps.LatLngBounds();
        props.dataArray.forEach(({ location }) => bounds.extend({ lat: location.latitude, lng: location.longitude }));
        map.fitBounds(bounds);
      }}
      onClick={() => setIsOpen(false)}
    >
      {props.dataArray.map(({ location, ...rest }, index) => {
        const position = { lat: location.latitude, lng: location.longitude };
        return (
          <MarkerF
            key={index}
            position={position}
            onClick={() => {
              mapRef?.panTo(position);
              setInfoWindowData({ type: props.type, data: { location, ...rest } } as MapData);
              setIsOpen(true);
            }}
          >
            {isOpen && infoWindowData?.data.id === rest.id && (
              <InfoWindowF
                onCloseClick={() => {
                  setIsOpen(false);
                }}
              >
                <DataCard
                  user={props.user}
                  {...match(infoWindowData)
                    .with({ type: 'event' }, (eventProps) => ({
                      ...eventProps,
                      detailRoute: route.eventDetails(infoWindowData.data.id),
                    }))
                    .with({ type: 'group' }, (groupProps) => ({
                      ...groupProps,
                      detailRoute: route.groupDetails(infoWindowData.data.id),
                    }))
                    .exhaustive()}
                  simplified
                />
              </InfoWindowF>
            )}
          </MarkerF>
        );
      })}
    </GoogleMap>
  );
};

export const DataMap = ({ height = '79vh', mapDataArray }: MapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  return (
    <Box h={height} w="100%" borderRadius="base">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : mapDataArray.dataArray.length > 1 ? (
        <MultipleMapDatas {...mapDataArray} />
      ) : (
        <SingleMapData
          {...match(mapDataArray)
            .with({ type: 'event' }, ({ type, dataArray: data }) => ({ type, data: data[0] }))
            .with({ type: 'group' }, ({ type, dataArray: data }) => ({ type, data: data[0] }))
            .exhaustive()}
        />
      )}
    </Box>
  );
};

