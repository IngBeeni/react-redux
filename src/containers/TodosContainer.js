// 리덕스와 연동된 컨테이너 컴포넌트 작성
import React, { Component } from 'react';
import Todos from 'components/Todos'; // {} !===> 변수(?)  => 디폴트 익스포트
import { connect } from 'react-redux'; // {} ===> 구조화된 무언가(?) => 걍 익스포트
import { bindActionCreators } from 'redux';
import * as todoActions from 'store/modules/todo';

class TodosContainer extends Component {
  handleChange = e => {
    // 인풋 값 변경
    const { TodoActions } = this.props;
    TodoActions.changeInput(e.target.value);
  };

  handleInsert = () => {
    // 아이템 추가
    const { input, TodoActions } = this.props;
    TodoActions.insert(input); // add
    TodoActions.changeInput(''); // input clean
  };

  handleToggle = id => {
    // cancel line toggle
    const { TodoActions } = this.props;
    TodoActions.toggle(id);
  };

  handleRemove = id => {
    // itme remove
    const { TodoActions } = this.props;
    TodoActions.remove(id);
  };

  render() {
    const { handleChange, handleInsert, handleToggle, handleRemove } = this;
    const { input, todos } = this.props;

    return (
      <Todos
        input={input}
        todos={todos}
        onChange={handleChange}
        onInsert={handleInsert}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    );
  }
}
export default connect(
  // state를 비구조화 할당 해 줌
  ({ todo }) => ({
    // immutable 사용 => 값을 조회 => .get
    input: todo.get('input'),
    todos: todo.get('todos')
  }),
  dispatch => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(TodosContainer);
