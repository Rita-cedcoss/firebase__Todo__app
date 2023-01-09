import React, { useEffect, useRef, useState } from "react";
import { useDispatch} from "react-redux";
import {
  allDoneTask,
  delAllItem,
  delDoneItem,
  delItem,
  todoData,
  updateTodo,
} from "../ReduxToolkit/todoSlice";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "firebase/database";
import firebaseApp from "../Todo_App/firebase";
const TodoList = () => {
  const [Todolist, setTodoList] = useState([]);
  const [dbItem, setDbitem] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [btnText, setBtntext] = useState("Add New Task");
  const dispatch = useDispatch();
  const db = getDatabase(firebaseApp);
  const inpref = useRef();
  const addData = () => {
    let title = inpref.current.value;
    console.log(title);
    if (btnText == "Add New Task") {
      const todoRef = ref(db, "/todos");
      const todo = {
        title,
        done: false,
      };
      push(todoRef, todo);
      dispatch(todoData(todo));
      inpref.current.value=""
    } else {
      dispatch(updateTodo({ arr: dbItem, title: title }));
      inpref.current.value = "";
      setBtntext("Add New Task");
      inpref.current.value="";
    }
  };
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
    setBtntext("Update Data");
    setDbitem(item);
  };
  // delete item
  const deleteItem = (item) => {
    dispatch(delItem(item));
  };
  // delete all item
  const deleteAllItem = () => {
    dispatch(delAllItem());
  };
  // done task
  const CompletedTask = (item) => {
    dispatch(allDoneTask(item));
  };
  // delete done task
  const deleteDonetask = () => {
    Todolist.map((item) => {
      if (item.done) {
        dispatch(delDoneItem(item));
      }
    });
  };
  return (
    <div className="outer">
      <h1>TodoInput</h1>
      <div className="todoForm">
        <div className="todoForm__input">
          <p>
            <i className="bi bi-card-text"></i>
          </p>
          <input type="text" placeholder="New Todo" ref={inpref} />
        </div>
        <button onClick={addData}>{btnText}</button>
      </div>
      <h1>Todo List</h1>
      <div className="todobutton">
        <button onClick={() => setDataFilter([])}>All</button>
        <button onClick={() => setDataFilter(["done", true])}>Done</button>
        <button onClick={() => setDataFilter(["done", false])}>Todo</button>
      </div>
      {Todolist.map((item, i) => {
        if (item[dataFilter[0]] == dataFilter[1]) {
          return (
            <div className="todolist " key={i}>
              <div className="todolist__content">
                <p className={item.done ? "cutText" : ""}>{item.title}</p>
                <div className="todolist__btn">
                  <input
                    type="checkbox"
                    onChange={() => CompletedTask(item)}
                    checked={item.done}
                  />
                  <button
                    className="todolist__btnedit"
                    onClick={() => editData(item)}
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="todolist__btndel"
                    onClick={() => deleteItem(item)}
                  >
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        }
      })}
      <div className="todobutton">
        <button className="todoBtn" onClick={deleteDonetask}>
          Delete Done Tasks
        </button>
        <button className="todoBtn" onClick={deleteAllItem}>
          Delete All Tasks
        </button>
      </div>
    </div>
  );
};

export default TodoList;
