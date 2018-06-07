// Matthew Binshtok
/* To-Do List React App

     Users can add tasks to a to-do list through a text input.
     Users can remove tasks from the to-do list using a remove button.
     Users can click a checkbox next to a task to mark it as completed.
     Users can remove completed tasks from the to-do list, and add them to a
     completed tasks list by pressing a complete tasks button.

*/

import React, { Component } from 'react';
import './App.css';

class App extends Component {

     // name: name of task currently being written
     // arrayOfTasks: tasks currently in the to-do list
     // completed: boolean of checkbox values for currently completed tasks
     // arrayOfFinished: tasks that were designated completed
     constructor(){
          super();
          this.state = {
               name: "",
               arrayOfTasks: [],
               completed: [],
               arrayOfFinished: [],
               isStarred: []
          }
     }

     // handles a change in the task name text input field
     // changes app state to reflect text currently in box
     handleChange(event){
          const name = event.target.value;
          this.setState({
               name
          })
          //console.log("this is the name in the handleChange: ", this.state.name )
     }

     // handles a submit of the task name text field
     // changes app state to empty the text box and pushes new task to list
     handleSubmit(event){
          event.preventDefault();
          const name = this.state.name;
          let temp = this.state.arrayOfTasks;
          // push task to list
          temp.push(name);
          // also, add a value for the item's checkbox (default: false)
          let tempCompleted = this.state.completed;
          tempCompleted.push(false);
          // finally, add a value for starred or not
          let tempStarred = this.state.isStarred;
          tempStarred.push(false);
          // update app state
          this.setState({
               arrayOfTasks: temp,
               completed: tempCompleted,
               isStarred: tempStarred
          })
          // empty the text input
          let text = this.refs.text;
          text.value = "";
          //console.log( "this is the new list of names: ", temp );
     }

     // removes a given task from the to-do list
     // changes app state to remove both task and its associated completed value
     removeTask(index, event){
          let temp = this.state.arrayOfTasks;
          // remove the task from the list
          temp.splice(index,1);
          let tempCompleted = this.state.completed;
          // remove its associated checkbox value
          tempCompleted.splice(index,1);
          // remove its associated starred state
          let tempStarred = this.state.isStarred;
          tempStarred.splice(index,1);
          // update app state
          this.setState({
               arrayOfTasks: temp,
               completed: tempCompleted,
               isStarred: tempStarred
          })
     }

     // moves the completed task to the completed tasks list
     // changes app state to add task to completed tasks list
     // PRECONDITION: Task has not been removed from to-do list
     completeTask(index){
          let temp = this.state.arrayOfTasks;
          let arrayOfFinished = this.state.arrayOfFinished;
          // push task to completed tasks list
          arrayOfFinished.push(temp[index]);
          this.setState({
               arrayOfFinished: arrayOfFinished
          })
          this.removeTask(index);
     }

     // stars the task at given index
     // see stylesheet for difference in formatting: starred-task-wrapper
     starTask(index, event){
          let tempStarred = this.state.isStarred;
          // switch the task at index
          tempStarred[index] = !tempStarred[index];
          // console.log( tempCompleted );
          // update app state
          this.setState({
               isStarred: tempStarred
          })
     }

     render() {
          // tasks in to-do list
          const arrayOfTasks = this.state.arrayOfTasks;
          // tasks in completed list
          const arrayOfFinished = this.state.arrayOfFinished;
          // task html mapped to each task
          const name = arrayOfTasks.map((name, i) => (
               <li key={i} >
               <div className="button-wrapper">
                    <button id="checked-button"
                         onClick={ this.completeTask.bind(this,i) }>
                         &#10003;
                    </button>
                    <button id="star-task-button" onClick={this.starTask.bind(this,i)}> &#9733; </button>
               </div>
               <div className={ this.state.isStarred[i] ? "starred-task-wrapper" : "task-wrapper"}>
                    {name}
               </div>
               <div className="remove-wrapper">
                    <button id="remove-task-button" onClick={this.removeTask.bind(this,i)}> &#9747; </button>
               </div>
               </li>
          ));
          // completed task html mapped to each task
          const finish = arrayOfFinished.map((finish, i) => (
               <li key={i} > {finish} </li>
          ));

          return (
               <div className="App">
                    <div className="App-header">
                         <p className="App-name"> To-Do-List </p>
                         <p className="App-credits"> a React app by Matthew Binshtok </p>
                    </div>
                    <div className="content-wrapper">
                         <div className="instructions">
                              <h3> Using The App </h3>
                              <p> Add tasks to the to-do list through the text input. <br/>
                              Remove a task from the to-do list using the remove button next to each task. <br/>
                              To move tasks from the to-do list to the completed list, use the check buttons next to every task. <br/>
                              </p>
                         </div>
                         <div className="main-content">
                              <div className="task-input">
                                   <form onSubmit={this.handleSubmit.bind(this)}>
                                        <p className="App-intro">
                                             Add a Task
                                        </p>
                                        <input className="add-task-field" ref="text" onChange={this.handleChange.bind(this)} type="text" name="task" />
                                        <input className="add-task-button" type="submit" value="Add Task" />
                                        <br />
                                   </form>
                              </div>
                              <div className="to-do-list">
                                   <p className="App-intro">
                                        To-Do List
                                   </p>
                                   <ul id="to-do">
                                        { (name) ? name : null }
                                   </ul>
                              </div>
                              <div className="completed-tasks-list">
                                   <p className="App-intro">
                                        Completed Tasks
                                   </p>
                                   <ul id="completed">
                                        { (finish) ? finish : null }
                                   </ul>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }

}

export default App;
