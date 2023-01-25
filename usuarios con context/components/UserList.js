import { useContext, useState } from "react";
import { AppContext } from "../Context";

const UserList = () => {
  const {
    users,
    userLength,
    editMode,
    cancelEdit,
    updateUser,
    deleteUser,
  } = useContext(AppContext);//llamo los metodos del contexto

  // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});//variable para el usuario

  const saveBtn = () => {
    updateUser(newData);//llamo el metodo con lo del usuario
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });//actualizo el campo en la variable y dejo los anteriores
  };

  const enableEdit = (id, user_name, user_email) => {
    setNewData({ id, user_name, user_email });
    editMode(id);
  };//cambio los campos y pongo para editar

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteUser(id);//llamo metodo para borrar
    }
  };

  //dependiendo si hay algun usuario o no
  return !userLength ? (
    <p>{userLength === null ? "Loading..." : "Please insert some users."}</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{/**muestro los usuarios */}
        {users.map(({ id, user_name, user_email, isEditing }) => {
          return isEditing === true ? (
            <tr key={id}>{/**si es que se esta editando, muestro sus atrivbutos y eventos para guardar */}
              <td>
                <input
                  type="text"
                  defaultValue={user_name}
                  onChange={(e) => updateNewData(e, "user_name")}
                />
              </td>
              <td>
                <input
                  type="email"
                  defaultValue={user_email}
                  onChange={(e) => updateNewData(e, "user_email")}
                />
              </td>
              <td>
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelEdit(id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={id}>{/**muestro el resto de usuarios con sus campos y evento para manejar cambios */}
              <td>{user_name}</td>
              <td>{user_email}</td>
              <td>
                <button
                  className="btn default-btn"
                  onClick={() => enableEdit(id, user_name, user_email)}
                >
                  Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;