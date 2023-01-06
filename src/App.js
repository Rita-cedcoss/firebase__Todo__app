import "./App.css";
import TodoList from "./ReduxToolkit/TodoList";
import TodoComponent from "./Todo_App/TodoComponent";
import "./Todo_App/TodoComponent.css";
function App() {
  return (
    <div className="App">
      {/* without using toolkit */}
      {/* <TodoComponent/> */}
      {/* using toolkit */}
      <TodoList />
    </div>
  );
}

export default App;
