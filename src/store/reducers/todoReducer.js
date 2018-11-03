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
      console.log(action.payload);
      const { todo } = state;
      const { id } = action.payload;
      console.log(todo);
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
      console.log("id", id);

      let newState = todo.map(obj => {
        console.log("obj.id", obj.id);

        if (String(obj.id) === String(id)) {
          console.log("match");
          return { ...editedTodo, reminder: obj.reminder };
        } else console.log("not match");
        return obj;
      });

      console.log("editedTodo", editedTodo);
      console.log("new State", newState);
      return { ...state, todo: [...newState] };
    }
    default:
      return state;
  }
};
