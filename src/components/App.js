import React from "react";
import TodoList from "./TodoList";
import "./App.css";

class App extends React.Component {

    state = {
        currentTask: "",
        tasks: [],
        filter: 'all'
    }

    keyGenerator(length) {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    }

    submitFormHandler(event) {
        event.preventDefault();
        const tasks = this.state.tasks.slice();
        tasks.push({
            id: this.keyGenerator(5),
            task: this.state.currentTask,
            completed: false
        })
        this.setState({ tasks: tasks, currentTask: "" });
    }

    inputUpdateHandler(event) {
        this.setState({ currentTask: event.target.value });
    }

    toggleTaskHandler(task) {
        let tasks = this.state.tasks.slice();
        tasks = tasks.map((cTask) => {
            if(cTask.id === task.id) {
                cTask.completed = !cTask.completed;
            }
            return cTask;
        });
        this.setState({ tasks: tasks });
    }

    deleteTaskHandler(task) {
        let tasks = this.state.tasks.slice();
        tasks = tasks.filter((cTask) => {
            return cTask.id !== task.id
        });
        this.setState({ tasks: tasks });
    }

    getCount(filter) {
        if (filter === 'all') {
            return this.state.tasks.length;
        }

        return this.state.tasks.filter((cTask) =>{
            return cTask.completed  === filter
        }).length;
    }

    filterTasks(filter) {
        this.setState({filter: filter});
    }

    getFilteredTasks (filter) {
        if(filter === 'all') {
            return this.state.tasks;
        }
        return this.state.tasks.filter(task => task.completed === filter);
    }

    completeAllTasks () {
        let tasks = this.state.tasks.slice();
        tasks = tasks.map((task) => {
            task.completed = true;
            return task;
        });
        this.setState({ tasks: tasks });
    }

    deleteAllTasks () {
        this.setState({ tasks: [] });
    }

    render() {
        return (
            <div className="app ui container">
                <h2 className="ui dividing header">Todo list</h2>
                <div className="ui middle aligned divided list">
                    <div className="item">
                        <form
                            className="ui form"
                            onSubmit={this.submitFormHandler.bind(this)}
                        >
                            <div className="ui fluid action input">
                                <input
                                    type="text"
                                    placeholder="Add a todo.."
                                    value={this.state.currentTask}
                                    onChange={this.inputUpdateHandler.bind(this)}
                                />
                                <button className="ui blue button">Add</button>
                            </div>
                        </form>
                    </div>
                    <TodoList 
                        tasks={this.getFilteredTasks(this.state.filter)}
                        toggleTaskHandler={this.toggleTaskHandler.bind(this)}
                        deleteTaskHandler={this.deleteTaskHandler.bind(this)}
                    />
                </div>
                <div className="ui horizontal divider">
                    Filters
                </div>
                <div className="ui segment">
                    <button 
                        className="ui primary basic button" 
                        onClick={this.filterTasks.bind(this, 'all')}
                    >   
                        Show All ({this.getCount('all')})
                    </button>
                    <button 
                        className="ui primary basic button" 
                        onClick={this.filterTasks.bind(this, true)}
                    >
                        Show Completed ({this.getCount(true)})
                    </button>
                    <button 
                        className="ui primary basic button" 
                        onClick={this.filterTasks.bind(this, false)}
                    >
                        Show Uncomplete ({this.getCount(false)})
                    </button>
                    <button 
                        className="ui primary basic button" 
                        onClick={this.completeAllTasks.bind(this)}
                    >
                        Complete All
                    </button>
                    <button 
                        className="ui primary basic button" 
                        onClick={this.deleteAllTasks.bind(this)}
                    >
                        Delete All
                    </button>
                </div>
            </div>
        );
    }
}

export default App;