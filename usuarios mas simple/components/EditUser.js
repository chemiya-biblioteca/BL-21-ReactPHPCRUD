import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ListUser() {
    const navigate = useNavigate();//para navegar

    const [inputs, setInputs] = useState([]);//para guardar el usuario

    const {id} = useParams();//parametro de la ruta

    useEffect(() => {
        getUser();
    }, []);//al iniciar busco el usuario

    function getUser() {//llamo a la api con el id para que lo busque y lo guardo
        axios.get(`http://localhost/api/user/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {//al cambiar dejo los campos de antes y actualizo el nuevo
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();//hago peticion a la api con la variable de estado y navego a la ruta

        axios.put(`http://localhost/api/user/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        
    }
    return (
        <div>
            <h1>Edit user</h1>
            <form onSubmit={handleSubmit}>{/**para manejar el evento */}
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Name: </label>
                            </th>
                            <td>
                                <input value={inputs.name} type="text" name="name" onChange={handleChange} />
                            </td>{/**enlazo con la variable y manejo el evento */}
                        </tr>
                        <tr>
                            <th>
                                <label>Email: </label>
                            </th>
                            <td> 
                                <input value={inputs.email} type="text" name="email" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Mobile: </label>
                            </th>
                            <td>
                                <input value={inputs.mobile} type="text" name="mobile" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align ="right">
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
