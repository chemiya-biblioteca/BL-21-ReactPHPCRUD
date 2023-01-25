import React, {useEffect,useState} from 'react'
import axios from 'axios';
import {Link } from "react-router-dom";

const Home = () => {

  useEffect( () => {
    window.scrollTo(0, 0);
    alluser();
  }, []); //al cargar busco todos los usuarios

  const [isuser, setuser] = useState([]);//para guardar los usuaurios
  const alluser = async (ids) => {
    try {
      axios.get(`http://localhost/Apicrud/users.php`)
      .then(res => {//peticion a la api
        console.log(res.data.userlist.userdata)
        setuser(res.data.userlist.userdata);//guardo los usuarios en la variable
      })
    } catch (error) { throw error;}    
  }

  const deleteConfirm = (id) => {//ventana para confirmar y llamo para borrar
    if (window.confirm("Are you sure?")) {
      deleteUser(id);
    }
  };
  const deleteUser = async (id) => {
    try {
      axios.post(`http://localhost/Apicrud/deleteusers.php`, { //le digo a la api que lo borre y le paso el id
        userids: id,
      })
      .then(res => {
        setuser([]);
        alluser();//vuelvo a buscar los usuaurios
        return;
       })
    } catch (error) { throw error;}    
  }

  return (
    <div>
    <Link to="/insert" className='btn'> Create User </Link>{/**enlace para crear uno nuevo */}
    {/**muestro los usuarios de la lista con cada atributo del objeto  enlace poniendo el id en la ruta y borrando pasa el id */}
    {isuser.map((item,index)=>(
    <div className="list" key={item.user_id}>
      <p>Name: {item.name}</p>
      <p>Email: {item.email}</p>
      <p>Date: {item.date}</p>
      <Link  to={`edit/${item.user_id}`} className="btn default-btn"> Edit </Link>
      <p onClick={() => deleteConfirm(item.user_id)} className="btn default-btn"> Delete </p> 
    </div>
  ))}
    </div>
  )
}

export default Home