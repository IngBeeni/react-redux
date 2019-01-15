// 리덕스와 연동된 컨테이너 컴포넌트 작성
import React, { Component } from 'react';
import Counter from 'components/Counter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; //3-3. bindActionCreator 함수 사용으로 코드 간소화
import * as counterActions from 'store/modules/counter';

class CounterContainer extends Component {
  // 1~2. 사용시 코드.
  //   handleIncrement = () => {
  //     this.props.increment();
  //   };

  //   handleDecrement = () => {
  //     this.props.decrement();
  //   };
  // 1~2. 사용시 코드.

  // 3-3. bindActionCreator 함수 사용으로 코드 간소화
  //    . bindActionCreator 사용 시 CounterActions를 props로 넣어줘야함.
  //    . 내가 만들 컨테이너 컴포넌트에서 여러 모듈에서 액션 생성 함수를 참조해야함.

  handleIncrement = () => {
    const { CounterActions } = this.props;
    CounterActions.increment();
  };

  handleDecrement = () => {
    const { CounterActions } = this.props;
    CounterActions.decrement();
  };

  render() {
    const { handleIncrement, handleDecrement } = this;
    const { number } = this.props;
    return (
      <Counter
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        number={number}
      />
    );
  }
}

// 1-1. props 값으로 넣어 줄 상태를 정의해 줍니다.
// const mapStateToPros = state => ({
//   number: state.counter.number
// });

// 2-1. props 값으로 넣어 줄 액션 함수들을 정의해 줍니다.
// const mapDispatchToProps = dispatch => ({
//   increment: () => dispatch(counterActions.increment()),
//   decrement: () => dispatch(counterActions.decrement())
// });

// 컴포넌트를 리덕스와 연동 할 때에는 connect를 사용합니다.
// connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환합니다.
// 반환된 함수에 우리가 만든 컴포넌트를 넣어주면 됩니다.

//
export default connect(
  // 3-1. mapStateToProps => 스토어의 상태를 매개변수로 받아오는 함수, 컴포넌트에 상태로 넣어줄 props를 반환함
  //    . mapDispatchToProps는 dispatch를 매개변수로 받아오는 함수로 컴포넌트에 넣어줄 액션 함수들을 반환함.
  //   mapStateToPros,
  //   mapDispatchToProps
  // 3-2. state와 dispatch를 함수 내부에 선언함으로 코드 간소화.
  //   state => ({ number: state.counter.number }),
  //   dispatch => ({
  //     increment: () => dispatch(counterActions.increment()),
  //     decrement: () => dispatch(counterActions.decrement())
  //   })
  // 3-3. bindActionCreator 함수 사용으로 코드 간소화
  state => ({
    number: state.counter.number
  }),
  dispatch => ({ CounterActions: bindActionCreators(counterActions, dispatch) })
)(CounterContainer);
