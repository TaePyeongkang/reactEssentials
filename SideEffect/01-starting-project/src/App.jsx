import { useEffect, useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

// 로컬스토리지와 AVAILABLE_PLACES를 이용해서 초기값 설정
const getPickedPlaces = () => {
  const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []; 
  // map을 통해서 storedIds의 요소와 AVAILABLE_PLACES의 id가 일치한걸 데이터에 담음
  const storedPlaces = storedIds.map(id => {
    return AVAILABLE_PLACES.find((place) =>place.id === id);
  });
  return storedPlaces;
}

function App() {
  // 모달창 열고, 삭제하기 위해 참조로 생성
  const modal = useRef();
  // 선택한 id를 저장하여 삭제할때 사용
  const selectedPlace = useRef();
  // 선택한 장소를 추가
  // const [pickedPlaces, setPickedPlaces] = useState([]);

  // 선택한 값을 초기설정함(처음 로드할때) + 선택한 장소를 추가
  const [pickedPlaces, setPickedPlaces] = useState(getPickedPlaces()); 
  // 본인 위치에서 가까운순으로 배열 저장
  const [nearPlace, setNearPlace] = useState([]);

  // [] 이건 한번만, [pickedPlaces] 이건 pickedPlaces 값이 변할때마다, 아무것도 없으면 계속(무한루프)
  useEffect(() => {
    // navigator는 브라우저에서 제공 위치제공 허용클릭하면 아래 함수실행하면서 position값 가져옴
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setNearPlace(sortedPlaces);
    });
  }, []);

  // 내가 선택한 장소가 추가되었고 추가된 Place 컴포넌트에서 여러 장소중 하나의 장소 선택 했을때 모달창 열고, 선택한 장소 아이디를 참조로 기억하기
  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  // 모달창에서 no 클릭했을때
  function handleStopRemovePlace() {
    modal.current.close();
  }

  // 선택한 장소 추가
  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      // 기존에 선택한 장소가 있을경우 기존 내용 반환
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      // 새로운 장소 추가할 경우 기존 내용에 새로운 장소 추가
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      // 마지막에 추가한걸 제일 앞으로 배치
      return [place, ...prevPickedPlaces];
    });

    // localStorage에 저장된 값 가져오기 없으면 빈배열
    const selectedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    // 선택한 장소의 아이디값이 localStorage에 없으면 추가 (나중에 추가한걸 먼저 추가하고 기존에 있던건 뒤에 추가)
    if (selectedIds.indexOf(id) === -1) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...selectedIds]));
    };

  }

  // 선택한 장소 삭제 선택된 장소와 아이디 비교하여 일치한거 제외하고 보여주고 모달창 닫기
  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();

    // 삭제하는 장소 id(selectedPlace.current)와 로컬스토리지에 있는 데이터 비교하여 일치하지 않는것만 다시 setItem함
    const selectedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []; 
    if (selectedIds.length > 0) return localStorage.setItem('selectedPlaces', JSON.stringify(selectedIds.filter(id => id !== selectedPlace.current)));
  }

  return (
    <>
      {/* modal 변수를 useRef를 통해 객체 생성하여 Modal 컴포넌트에 props */}
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={pickedPlaces} // 선택한 장소가 추가 된 내용 props
          onSelectPlace={handleStartRemovePlace} // 선택한 장소 삭제 모달창 함수 props
        />
        <Places
          title="Available Places"
          places={nearPlace} // 기존 더미 데이터 넣어서 선택할 내용 보여주기 => 본인 위치에 가까운 장소순으로 보여줌
          fallbackText="Sorting place by distance."
          onSelectPlace={handleSelectPlace} // 선택한 장소 추가 함수 props
        />
      </main>
    </>
  );
}

export default App;
