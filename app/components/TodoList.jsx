import React from 'react';
const { connect } = require('react-redux');

const Todo = require('Todo');
/*
性質：stateless component
負責工作：處理資料後render Todo component
接收props：從TodoApp接收todos props
簡介：將各項todo列表出來
*/
let TodoList = React.createClass({
  render: function () {
    let { todos } = this.props;
    let renderTodos = () => {
      //這邊的參數todo是自定義的，
      //因為todos是一個陣列含有許多object
      //如果我們不在map中設定參數的話，我們的todos變數將會無法被定位
      //除非我們加上[0]之類的定位
      //而參數todo則是一次一個todos中的object，酷
      if(todos.length === 0){
        return (
          <p className="container__message">目前沒有待辦事項</p>
        );
      }
      return todos.map((todo) => {
        //這邊有用到剩餘參數{...todo}，代表著object內的所有剩餘的東西
        return (
          <Todo key={todo.id} {...todo} />
        );
      });
    };

    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
});

// 使用react-redux套件內的connect
// 並返回從store過來的state
module.exports = connect(
  (state) => {
    return {
      todos: state.todos
    };
  }
)(TodoList);