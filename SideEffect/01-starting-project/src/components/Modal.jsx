import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

// App 컴포넌트에서 전달받은 modal 즉, ref Modal 컴포넌트에서 사용
// forwardRef 참조 함수를 통해서 부모가 자식의 내용을 사용할수 있도록 해줌
// useImperativeHandle 부모에 참조 ref(modal) current에 open(), close() 함수를 추가
// Modal 컴포넌트에서 dialog 참조 객체를 생성하여 html <dialog>와 연결
// 연결된 dialog 객체를 open(), close() 함수에 연결 
// 그럼 부모 컴포넌트(App)에서 접근(사용) 가능
// createPortal 이걸 통해서 모달창 위치를 나타낼수 있다 (일부 자식을 DOM의 다른 부분으로 렌더링할 수 있습니다.)
// document.getElementById('modal') 이건 모달창을 어디에 나타낼 위치

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
