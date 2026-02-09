import { useState, useEffect, useCallback } from 'react';

interface GeolocationState {
  location: { latitude: number; longitude: number } | null;
  error: string | null;
  isLoading: boolean;
  isUsingDefault: boolean;
  retry: () => void;
}

const DEFAULT_USER_LAT = 4.609123;
const DEFAULT_USER_LON = -74.068395;

export const useGeolocation = (): GeolocationState => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingDefault, setIsUsingDefault] = useState(false);

  const fetchGeolocation = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setIsUsingDefault(false);
    setLocation(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (err) => {
          console.error('Error getting user location:', err);
          let errMsg = 'Failed to get your precise location.';
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errMsg =
                'Location access denied. Displaying lockers based on a default city. Please allow location access for better results.';
              break;
            case err.POSITION_UNAVAILABLE:
              errMsg =
                'Location information is unavailable. Displaying lockers based on a default city.';
              break;
            case err.TIMEOUT:
              errMsg =
                'The request to get user location timed out. Displaying lockers based on a default city.';
              break;
            default:
              errMsg = `An unknown error occurred while getting location. Displaying lockers based on a default city.`;
          }
          setError(errMsg);
          setLocation({
            latitude: DEFAULT_USER_LAT,
            longitude: DEFAULT_USER_LON,
          });
          setIsUsingDefault(true);
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    } else {
      setError(
        'Geolocation is not supported by your browser. Displaying lockers based on a default city.',
      );
      setLocation({ latitude: DEFAULT_USER_LAT, longitude: DEFAULT_USER_LON });
      setIsUsingDefault(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGeolocation();
  }, [fetchGeolocation]);

  return {
    location,
    error,
    isLoading,
    isUsingDefault,
    retry: () => window.location.reload(),
  };
};
