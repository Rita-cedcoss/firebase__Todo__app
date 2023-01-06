import { createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, update, remove, set } from "firebase/database";
import firebaseApp from "../Todo_App/firebase";

let initialState = {
  todoarr: [],
};
const db = getDatabase(firebaseApp);
let todoRef = ref(db, "/todos");
export const todoDataSlice = createSlice({
  name: "todoapp",
  initialState,
  reducers: {
    todoData: (state, action) => {
      state.todoarr = [...state.todoarr, action.payload];
    },
    updateTodo: (state, action) => {
      todoRef = ref(db, "/todos/" + action.payload.arr.id);
      update(todoRef, { title: action.payload.title });
    },
    delItem: (state, action) => {
      console.log(action.payload);
      todoRef = ref(db, "/todos/" + action.payload.id);
      remove(todoRef);
    },
    delAllItem: (state, action) => {
      todoRef = ref(db, "/todos/");
      remove(todoRef);
    },
    allDoneTask: (state, action) => {
      console.log(action.payload);
      if (action.payload.done) {
        set(ref(db, "/todos/" + action.payload.id + "/done"), false);
      } else {
        set(ref(db, "/todos/" + action.payload.id + "/done"), true);
      }
    },
    delDoneItem: (state, action) => {
      todoRef = ref(db, "/todos/" + action.payload.id);
      remove(todoRef);
    },
  },
});
export const {
  todoData,
  updateTodo,
  delItem,
  delAllItem,
  allDoneTask,
  delDoneItem,
} = todoDataSlice.actions;

export default todoDataSlice.reducer;
