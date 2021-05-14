import React from "react";
import Todo from "./Todo";

const TodoList = (props) => {
    return(
        props.tasks.map((task, i) => {
            return <Todo key={i}
                        task={task}
                        toggleTaskHandler={props.toggleTaskHandler} 
                        deleteTaskHandler={props.deleteTaskHandler}
                    />
        })
    )
};

export default TodoList;