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
import firebaseApp from "./firebase";
function TodoComponent() {
  const [btnText, setBtntext] = useState("Add New Task");
  const [dataFilter, setDataFilter] = useState([]);
  const [dbItem, setDbitem] = useState([]);
  const [Todolist, setTodoList] = useState([]);
  const db = getDatabase(firebaseApp);
  const inpref = useRef();
  // add todo data
  const addTodo = () => {
    let title = inpref.current.value;
    if (btnText == "Add New Task") {
      const todoRef = ref(db, "/todos");
      const todo = {
        title,
        done: false,
      };
      push(todoRef, todo);
      inpref.current.value = "";
    } else {
      const todoRef = ref(db, "/todos/" + dbItem.id);
      update(todoRef, { title });
      inpref.current.value = "";
      setBtntext("Add New Task");
      alert("Data is updated successfully");
    }
  };
  // data display
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
    const todoRef = ref(db, "/todos/" + item.id);
    remove(todoRef);
  };
  // delete all item
  const deleteAllItem = () => {
    const todoRef = ref(db, "/todos/");
    remove(todoRef);
  };
  // completed task
  const CompletedTask = (item) => {
    if (item.done) {
      set(ref(db, "/todos/" + item.id + "/done"), false);
    } else {
      set(ref(db, "/todos/" + item.id + "/done"), true);
    }
  };
  // delete all completed task
  const deleteDonetask = () => {
    Todolist.map((item) => {
      if (item.done) {
        const todoRef = ref(db, "/todos/" + item.id);
        remove(todoRef);
      }
    });
  };
  return (
    <div className="outer">
      <h1>TodoInput</h1>
      <div className="todoForm">
        <div className="todoForm__input">
          <p>
            <i class="bi bi-card-text"></i>
          </p>
          <input type="text" placeholder="New Todo" ref={inpref} />
        </div>
        <button onClick={addTodo}>{btnText}</button>
      </div>
      <h1>Todo List</h1>
      <div className="todobutton">
        <button onClick={() => setDataFilter([])}>All</button>
        <button onClick={() => setDataFilter(["done", true])}>Done</button>
        <button onClick={() => setDataFilter(["done", false])}>Todo</button>
      </div>
      <div className="todolist ">
        {Todolist.map((item, i) => {
          console.log(item[dataFilter[0]] == dataFilter[1]);
          if (item[dataFilter[0]] == dataFilter[1]) {
            return (
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
                    onClick={() => editData(item, i)}
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
            );
          }
        })}
      </div>
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
}

export default TodoComponent;
