//第三方lib
import React from 'react';
import uuid  from 'node-uuid';//一個專門產出獨特id的npm 套件
import moment from 'moment';
//components
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import TodoAPI from 'TodoAPI';
/*
性質：stateful component
負責工作：將state傳遞給子component，並藉由他們更新之
接收props：無
*/
let TodoApp = React.createClass({
  getInitialState: function () {
    return {
      //從TodoAPI呼叫getTodos()得到成為state.todos
      todos: TodoAPI.getTodos(),
      showCompleted: false,
      searchText: ''
    };
  },
  //在render function後執行，如果state或props有更新的話才會執行
  componentDidUpdate:function(){
    //呼叫TodoAPI component的setTodos()
    //將目前state傳入TodoAPI為參數
    TodoAPI.setTodos(this.state.todos);
  },
  //經過AddTodo component回傳更新state
  handleAddTodo: function(text){

    this.setState({
      todos:[
        ...this.state.todos,//將目前的state引入進來
        {
          id:uuid(),//id如果要是獨特獨有的，我們要用node的套件node-uuid
          text:text,//這邊接AddTodo component傳來的user輸入就好
          completed:false,//預設當然為false因為才剛增加應該還沒做吧
          createAt: moment().unix(),//將會返回timestamp，我們要轉為format
          completedAt: undefined//完成時間
         }
      ]
    });
  },

  //經過TodoSearch component回傳更新state
  handleSearch:function(showCompleted,searchText){
    this.setState({
      showCompleted:showCompleted,
      searchText:searchText.toLowerCase()
    });
  },
  
  render: function () {
    let {todos,showCompleted,searchText} = this.state;
    //這個會透過prop傳至TodoList且在TodoList內map
    let filteredTodos = TodoAPI.filterTodos(todos,showCompleted,searchText);
    return (
      <div>
        <h1 className="page-title">Paul & React todo App</h1>
       
        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
               <TodoSearch onSearch={this.handleSearch} />
               <TodoList/>
               <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = TodoApp;
