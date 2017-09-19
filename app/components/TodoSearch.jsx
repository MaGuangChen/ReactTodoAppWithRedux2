import React from 'react';
/*
負責工作：找尋TodoApp 的state.todo中符合條件的object，並render之
*/
let TodoSearch = React.createClass({
   handleSearch:function(){
     //抓checkbox的ref，是否被勾選
     let showCompleted = this.refs.showCompleted.checked;
     //抓 search bar的ref，user輸入了什麼
     let searchText = this.refs.searchText.value;
     
     this.props.onSearch(showCompleted,searchText);
   },


    render: function(){
       return (
           <div className="container__header">
             <div>
             <input 
                type="search" 
                ref="searchText" 
                placeholder="搜尋待辦事項"
                onChange={this.handleSearch}
                /> 
             </div>

             <div>
                <label>
                    <input 
                      type="checkbox" 
                      ref="showCompleted"
                      onChange={this.handleSearch}
                     />
                     顯示已完成的待辦事項
                </label>
             
             </div>
           </div>
       )
    }
});
module.exports = TodoSearch;