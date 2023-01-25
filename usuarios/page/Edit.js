import React, {useEffect,useState} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Edituser from "./Edituser";

const Edit = () => {
  let params = useParams();//para el parametro del id
  let navigate = useNavigate();//para navegar

  useEffect( () => {
    window.scrollTo(0, 0);
    edituserlist(params.ids);
  }, []); //al cargar buscar los datos del usuario

  const [isuser, setuser] = useState([]);//creas variables con el usuario
  const [isloaduser, setloaduser] = useState(false);
  const edituserlist = async (ids) => {
    try {
      axios.post(`http://localhost/Apicrud/getusers.php`, { 
        userids: ids,
      })//haces peticion a la api con el id
      .then(res => {
        console.log(res.data.userlist.userdata)
        setuser(res.data.userlist.userdata[0]);//lo guardas en la variable del usuario
        setloaduser(true);
      })
    } catch (error) { throw error;}    
  }

  return (//si esta cargado el usuario, llamo al componente y le paso el usuario
    <div>
    {isloaduser && 
      <Edituser list={isuser} />
    }
    </div>
  )
}

export default Edit