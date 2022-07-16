import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Items({ item, indice, deleteItem }) {
   return (
      <tr>
         <th scope="row">{indice}</th>
         <td>{item.name}</td>
         <td>{item.peso}</td>
         <td>{item.estatura}</td>
         <td>{item.imc}</td>
         <td>{item.oms}</td>
         <td>{item.des}</td>
         <td className='d-flex align-items-center justify-content-center'>
            <button className='btn btn-outline-danger btn-sm btnDel' onClick={() => deleteItem(`${item.id}`, `${item.name}`)}>
               <FontAwesomeIcon icon={faTrashAlt} className="icon" />
            </button>
         </td>
      </tr>
   )
}

export default Items