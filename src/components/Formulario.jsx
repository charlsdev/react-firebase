import { useState } from "react";
import Swal from 'sweetalert2';
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
   addDoc,
   collection 
} from "firebase/firestore"
import { db } from "../firebase";

function Formulario({ setChange }) {
   const [imc, setImc] = useState({
      name: "",
      peso: "",
      estatura: "",
   })

   const alerts = ({title, text, icon}) => {
      Swal.fire({
         title,
         text,
         icon
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         if (
            imc.name === '' ||
            imc.peso === '' ||
            imc.estatura === ''
         ) {
            alerts({
               title: 'Campos Vacíos',
               text: 'Los campos no pueden or vacios o con espacios...',
               icon: 'warning'
            });
         } else {
            let IMC, oms, des;
            IMC = imc.peso / (imc.estatura * imc.estatura);

            if (IMC.toFixed(2) < 18.5) {
               oms = 'Bajo Peso'
               des = 'Delgado'
            } else {
               if (IMC.toFixed(2) >= 18.5 && IMC.toFixed(2) <= 24.9) {
                  oms = 'Adecuado'
                  des = 'Aceptable'
               } else {
                  if (IMC.toFixed(2) >= 25 && IMC.toFixed(2) <= 29.9) {
                     oms = 'Sobrepeso'
                     des = 'Sobrepeso'
                  } else {
                     if (IMC.toFixed(2) >= 30 && IMC.toFixed(2) <= 34.9) {
                        oms = 'Obesidad grado 1'
                        des = 'Obesidad'
                     } else {
                        if (IMC.toFixed(2) >= 35 && IMC.toFixed(2) <= 39.9) {
                           oms = 'Obesidad grado 2'
                           des = 'Obesidad'
                        } else {
                           oms = 'Obesidad grado 3'
                           des = 'Obesidad'
                        }
                     }
                  }
               }
            }

            const docRef = await addDoc(collection(db, "imc"), { name: imc.name, peso: imc.peso, estatura: imc.estatura, imc: IMC.toFixed(2), oms, des });

            if (docRef.id) {
               alerts({
                  title: 'Registro guardado',
                  text: `${imc.name}, su IMC es: ${IMC.toFixed(2)} - ${oms} - ${des}.`,
                  icon: 'success'
               });

               setImc({
                  name: "",
                  peso: "",
                  estatura: "",
               })

               setChange(true)
            } else {
               alerts({
                  title: 'Registro no guardado',
                  text: 'No se podido guardar el dato...',
                  icon: 'success'
               });
            }
         }
      } catch (e) {
         console.log(e);
      }
   }

   return (
      <>
         <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <label htmlFor="" className="form-label">Nombres Completos</label>
               <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su nombre completo"
                  value={imc.name}
                  onChange={(e) => setImc({ ...imc, name: e.target.value })}
               />
            </div>

            <div className="mb-3">
               <label htmlFor="" className="form-label">Peso</label>
               <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su peso"
                  value={imc.peso}
                  onChange={(e) => setImc({ ...imc, peso: e.target.value })}
               />
            </div>

            <div className="mb-3">
               <label htmlFor="" className="form-label">Estatura</label>
               <input 
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su estatura"
                  value={imc.estatura}
                  onChange={(e) => setImc({ ...imc, estatura: e.target.value })} 
               />
            </div>

            <div className="col-md-12 d-flex justify-content-end">
               <button className="btn btn-outline-success btn-sm btnIcon">
                  <FontAwesomeIcon icon={faSave} className="icon" />
                  Enviar
               </button>
            </div>
         </form>
      </>
   )
}

export default Formulario