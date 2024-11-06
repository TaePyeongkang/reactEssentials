export async function fetchAvailablePlaces() {
  const response = await fetch(`http://localhost:3000/places`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places.");
  }
  return resData.places;
}


export async function fetchUserSelectPlaces(userSelected) {
  const response = await fetch(`http://localhost:3000/user-places`, {
    method: 'PUT',
    body: JSON.stringify({places: userSelected}),
    headers: { 'Content-Type': 'application/json'},
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to updated user data.");
  }
  return resData.message
}  

export async function userSelectedPlace() {
  const response = await fetch(`http://localhost:3000/user-places`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places.");
  }
  return resData.places;
}