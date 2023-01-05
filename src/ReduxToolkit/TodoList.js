import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoData } from "../ReduxToolkit/todoSlice";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  remove,
  set,
} from "firebase/database";
import firebaseApp from "../Todo_App/firebase";
const TodoList = () => {
  const state=useSelector(state=>state);
  const [Todolist, setTodoList] = useState([]);
  const dispatch=useDispatch();
  const db = getDatabase(firebaseApp);
  const inpref=useRef();
  const addData=()=>{
    let title = inpref.current.value;
    console.log(title);
    const todoRef = ref(db, "/todos");
      const todo = {
        title,
        done: false,
      };
      push(todoRef, todo);   
      dispatch( todoData(todo)); 
  }
//  display data

useEffect(() => {
  const todoRef = ref(db, "/todos");
  onValue(todoRef, (snapshot) => {
    const todoValue = snapshot.val();
    const newTodoList = [];
    for (let id in todoValue) {
      newTodoList.push({ id, ...todoValue[id] });
    }
    setTodoList(newTodoList);
  });
}, [db]);
//  edit item
const editData = (item, index) => {
  inpref.current.value = item.title;
  // setBtntext("Update Data");
  // setDbitem(item);
};
  return (
    <div className="outer">
      <h1>TodoInput</h1>
      <div className="todoForm">
        <div className="todoForm__input">
          <p>
            <i className="bi bi-card-text"></i>
          </p>
          <input type="text" placeholder="New Todo" ref={inpref}/>
        </div>
        <button onClick={addData}>Add Task</button>
      </div>
      <h1>Todo List</h1>
      <div className="todobutton">
        <button>All</button>
        <button>Done</button>
        <button>Todo</button>
      </div>{
        Todolist.map((item,i)=>{
          console.log(item);
          return(
          <div className="todolist " key={i}>
          <div className="todolist__content">
            <p className="">{item.title}</p>
            <div className="todolist__btn">
              <input type="checkbox" />
              <button className="todolist__btnedit" >
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button className="todolist__btndel">
                <i class="bi bi-trash3-fill"></i>
              </button>
            </div>
          </div>
        </div>)   
        })
      }
      <div className="todobutton">
        <button className="todoBtn">Delete Done Tasks</button>
        <button className="todoBtn">Delete All Tasks</button>
      </div>
    </div>
  );
};

export default TodoList;
