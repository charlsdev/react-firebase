import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Items({ item, indice, deleteItem }) {
   return (
      <tr>
         <th nowrap="true" scope="row">{indice}</th>
         <td nowrap="true">{item.name}</td>
         <td nowrap="true">{item.peso}</td>
         <td nowrap="true">{item.estatura}</td>
         <td nowrap="true">{item.imc}</td>
         <td nowrap="true">{item.oms}</td>
         <td nowrap="true">{item.des}</td>
         <td nowrap="true" className='d-flex align-items-center justify-content-center'>
            <button className='btn btn-outline-danger btn-sm btnDel' onClick={() => deleteItem(`${item.id}`, `${item.name}`)}>
               <FontAwesomeIcon icon={faTrashAlt} className="icon" />
            </button>
         </td>
      </tr>
   )
}

export default Items