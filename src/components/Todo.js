import React from "react";

const Todo = (props) => {
    return (
        <div className="item">
            <div className="right floated content">
                {!props.task.completed? <button className="ui green button" onClick={() => props.toggleTaskHandler(props.task)}>Done</button> : <React.Fragment><button className="ui red button" onClick={() => props.deleteTaskHandler(props.task)}>Delete</button> <button className="ui blue button" onClick={() => props.toggleTaskHandler(props.task)}>Undone</button></React.Fragment>}
            </div>
            <div className="content">
                {props.task.task}
            </div>
        </div>
    );
}

export default Todo;