import { createAction, handleActions } from 'redux-actions';
// *.카운터 관련 상태 로직

// 1-1.액션타입 정의
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// 2-1.액션 생성 함수를 만듬.
// 3-1.이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내 줍니다.
// export const increment = () => ({ type: INCREMENT });
// export const decrement = () => ({ type: DECREMENT });
// export const increment = INCREMENT; 하면 안되는 이유 -> 리액트에서 상태변화라고 판단함 -> 무한 반복 가능

// 2-2. createAction 사용
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

// 4. 모듈의 초기 상태를 정의합니다.
const initialState = {
  number: 0
};

// 5-1. 리듀서를 만들어서 내보내줍니다.
// export default function reducer(state = initialState, action) {
//   // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
//   // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
//   switch (action.type) {
//     case INCREMENT:
//       return { number: state.number + 1 };
//     case DECREMENT:
//       return { number: state.number - 1 };
//     default:
//       return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
//   }
// }

// 액션과 리듀서를 각각 같은 파일에 작성하는 것을 Ducks 구조라고 함.

//5-2. createAction 함수 사용
// handleActions 의 첫번째 파라미터는 액션을 처리하는 함수들로 이뤄진 객체이고
// 두번째 파라미터는 초기 상태 입니다.
export default handleActions(
  {
    [INCREMENT]: (state, action) => {
      return { number: state.number + 1 };
    },
    // action 객체를 참조하지 않으니까 이렇게 생략을 할 수 있음.
    // state 부분에서 비 구조화 할당도 해주어서 코드를 더욱 간소화 시킴.
    [DECREMENT]: ({ number }) => ({ number: number - 1 })
  },
  initialState
);
