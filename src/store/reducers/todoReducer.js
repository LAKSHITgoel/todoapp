import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../types";

const initialState = {
  todo: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return { ...state, todo: [...state.todo, action.payload] };
    }
    case DELETE_TODO: {
      // console.log(action.payload);
      const { todo } = state;
      const { id } = action.payload;
      //removing the current id todo object in the todo array
      let newArr = todo.filter(obj => {
        if (obj.id !== id) {
          return obj;
        }
      });
      return { ...state, todo: [...newArr] };
    }
    case EDIT_TODO: {
      const { id, title, desc } = action.payload;
      const { todo } = state;
      let editedTodo = { id, title, desc };
      let newState = todo.map(obj => {
        if (String(obj.id) === String(id)) {
          return { ...editedTodo, reminder: obj.reminder };
        }
        return obj;
      });
      return { ...state, todo: [...newState] };
    }
    default:
      return state;
  }
};
