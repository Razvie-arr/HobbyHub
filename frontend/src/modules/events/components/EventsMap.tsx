import { useState } from 'react';
import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';

export const EventsMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<{ id: number; address: string }>();

  const markers = [
    { address: 'Address1', lat: 18.5204, lng: 73.8567 },
    { address: 'Address2', lat: 18.5314, lng: 73.8446 },
    { address: 'Address3', lat: 18.5642, lng: 73.7769 },
  ];

  return (
    <div
      style={{
        height: '88vh',
        width: '100%',
      }}
    >
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
            markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
            map.fitBounds(bounds);
          }}
          onClick={() => setIsOpen(false)}
        >
          {markers.map(({ address, lat, lng }, index) => (
            <MarkerF
              key={index}
              position={{ lat, lng }}
              onClick={() => {
                mapRef?.panTo({ lat, lng });
                setInfoWindowData({ id: index, address });
                setIsOpen(true);
              }}
            >
              {isOpen && infoWindowData?.id === index && (
                <InfoWindowF
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <h3>{infoWindowData.address}</h3>
                </InfoWindowF>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

