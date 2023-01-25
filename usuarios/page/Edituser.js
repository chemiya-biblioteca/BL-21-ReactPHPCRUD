import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Edituser = (props) => {
  const navigate = useNavigate();//para navegar
  const [userInfo, setuserInfo] = useState({
    name: props.list.name,
    email: props.list.email,
  });//datos del usuario, cojo lo de props que me mandan
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });//al cambiar dejo todos los cmapos y actualizo el nuevo
  } 
  // Inserting a new user into the Database.
  const submitUser = async(event) => {
    try {
      event.preventDefault();
      event.persist();
      axios.post(`http://localhost/Apicrud/editusers.php`, { 
        username: userInfo.name,
        useremail: userInfo.email,
        userids: props.list.user_id,//cojo el id de la ruta
      })//le digo a la api que lo guarde con los datos
      .then(res => {
        console.log(res.data);
        navigate(`/`);//navego a la principal
        return;
       })
    } catch (error) { throw error;}    
  };

return (
  <form className="editForm" onSubmit={submitUser}>{/**evento para manejar el formulario */}
    <h2> Edit Form </h2>
    <label htmlFor="_name">Name</label>
    <input
      type="text"
      id="_name"
      name="name"
      value={userInfo.name}
      onChange={onChangeValue}
      placeholder="Enter name"
      autoComplete="off"
      required
    />{/**enlazo con el valor de la variable, evento para manejar cambio */}
    <br /> <br />
    <label htmlFor="_email">Email</label>
    <input
      type="email"
      id="_email"
      name="email"
      value={userInfo.email}
      onChange={onChangeValue}
      placeholder="Enter email"
      autoComplete="off"
      required
    />{/**enlazo con el valor de la variable, evento para manejar cambio */}
    <br /> <br />
    <input type="submit" value="update" />
  </form>
);
};

export default Edituser;