import React from 'react';

/*
性質：stateless component
負責工作：接受TodoApp component的state，並將user輸入返回至TodoApp component
接收props：有，onAddTodo
*/
const AddTodo = React.createClass({
    handleSubmit: function(e){
       e.preventDefault();
       let todoText = this.refs.todoText.value;
       if(todoText.length > 0){
         this.refs.todoText.value = '';
         this.props.onAddTodo(todoText);

       }else{
         this.refs.todoText.focus();
         //如果沒打字就會閃亮沒打字的區域讓他們再試一次
       }
    },
    render: function(){
        return (
          <div className="container__footer">
             <form onSubmit={this.handleSubmit}>
                <input type="text" ref="todoText" placeholder="輸入今日待辦事項" />
                <button className="button expanded">增加至清單</button>
             </form> 
          </div>
        );
    }
});

module.exports = AddTodo;
