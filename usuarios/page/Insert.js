import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Insert = () => {
  const navigate = useNavigate();//para navegar
  const [userInfo, setuserInfo] = useState({
    name: '',
    email: '',
  });//usuario vacio
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });//alc ambiar mantengo lo anterio y guardo el nuevo campo
  } 
  // Inserting a new user into the Database.
  const submitUser = async(event) => {
    try {
      event.preventDefault();
      event.persist();
     
      axios.post(`http://localhost/Apicrud/addusers.php`, { //llamo a la  api para qu elo guarde en la base datos
        username: userInfo.name,
        useremail: userInfo.email,//le paso los datos
      })
      .then(res => {
        console.log(res.data);
        navigate(`/`);//navego a la riuta
        return;
       })
    } catch (error) { throw error;}    
  };

return (
  <form className="insertForm" onSubmit={submitUser}>{/**evento para manejarlo */}
    <h2> Add Form </h2>
    <label htmlFor="_name">Name</label>
    <input
      type="text"
      id="_name"
      name="name"
      onChange={onChangeValue}
      placeholder="Enter name"
      autoComplete="off"
      required
    />{/**enlazo con el campo y evento para manejarlo */}
    <br /> <br />
    <label htmlFor="_email">Email</label>
    <input
      type="email"
      id="_email"
      name="email"
      onChange={onChangeValue}
      placeholder="Enter email"
      autoComplete="off"
      required
    />
    <br /> <br />
    <input type="submit" value="Insert" />
  </form>
);
};

export default Insert;