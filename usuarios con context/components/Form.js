import { useState, useContext } from "react";
import { AppContext } from "../Context";
const Form = () => {
  const { insertUser } = useContext(AppContext);//uso el contexto
  const [newUser, setNewUser] = useState({});//para el nuevo usuario

  // Storing the Insert User Form Data.
  const addNewUser = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
    });//mismos campos de antes y actualizo el nuevo
  };

  // Inserting a new user into the Database.
  const submitUser = (e) => {
    e.preventDefault();
    insertUser(newUser);//llamo al meotodo para insertar
    e.target.reset();//vacio el formulario
  };

  return (
    <form className="insertForm" onSubmit={submitUser}>{/**manejo el evento */}
      <h2>Insert User</h2>
      <label htmlFor="_name">Name</label>
      <input
        type="text"
        id="_name"
        onChange={(e) => addNewUser(e, "user_name")}
        placeholder="Enter name"
        autoComplete="off"
        required
      />{/**evento para manejar el cambio */}
      <label htmlFor="_email">Email</label>
      <input
        type="email"
        id="_email"
        onChange={(e) => addNewUser(e, "user_email")}
        placeholder="Enter email"
        autoComplete="off"
        required
      />
      <input type="submit" value="Insert" />
    </form>
  );
};

export default Form;