import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true);
    const fetchPlaces = async () => {
      try {
        // 서버에있는 데이터 받아오기
        const responsePlaces = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const nearPlaces = sortPlacesByDistance(
            responsePlaces,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(nearPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false);
      }
    };
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="에러 발생" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={isFetching}
      loadingText="데이터 로딩중..."
    />
  );
}
