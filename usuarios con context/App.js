import { Provider } from "./Context";
import Form from "./components/Form";
import UserList from "./components/UserList";
import { Actions } from "./Actions";
function App() {
  const data = Actions();
  return (
    <Provider value={data}>
      <div className="App">
        <h1>React JS + PHP CRUD Application</h1>
        <div className="wrapper">
          <section className="left-side">
            <Form />{/**llamo el formulario */}
          </section>
          <section className="right-side">
            <UserList />{/**llamo la lista */}
          </section>
        </div>
      </div>
    </Provider>
  );
}

export default App;