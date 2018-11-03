import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../types";
export const addTodo = ({ title, id, desc, reminder }) => dispatch => {
  let currentTime = +new Date();
  let reminderTime = +new Date(reminder);
  let time = reminderTime - currentTime;
  console.log("reminderTime", reminderTime);
  console.log("currentTime", currentTime);
  console.log("time", time);
  setTimeout(() => {
    alert(`reminder for ${title}`);
  }, time);
  let data = {
    id,
    title,
    desc,
    reminder
  };
  dispatch({
    type: ADD_TODO,
    payload: data
  });
};

export const deleteTodo = id => dispatch => {
  dispatch({
    type: DELETE_TODO,
    payload: { id }
  });
};

export const editTodo = ({ id, title, desc }) => dispatch => {
  let data = { id, title, desc };
  console.log("edit action",data)
  dispatch({
    type: EDIT_TODO,
    payload: data
  });
};
