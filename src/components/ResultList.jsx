import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Items from "./Items";
import { 
   collection, 
   getDocs,
   deleteDoc,
   doc
} from "firebase/firestore"
import { db } from "../firebase";

function ResultList({ change, setChange }) {
   let indice = 0;

   const [getData, setGetData] = useState([])

   useEffect(() => {
      async function fetchData() {
         let result = []

         const docs = await getDocs(collection(db, "imc"));
   
         docs.forEach((doc) => {
            result.push({
               id: doc.id,
               name: doc.data().name,
               estatura: doc.data().estatura,
               peso: doc.data().peso,
               imc: doc.data().imc,
               oms: doc.data().oms,
               des: doc.data().des,
            })
         });

         setGetData(result)
         setChange(false)
      }

      if (change) {
         fetchData()
      }
   }, [ change ]);

   const deleteItem = async (idItem, nameItem) => {
      Swal.fire({
         title: 'EELIMINAR REGISTRO',
         text: `Deseas eliminar el registro de ${nameItem}?`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#2ebf91',
         cancelButtonColor: '#ec2F4B',
         confirmButtonText: 'Yes, eliminar!'
      }).then(async (result) => {
         if (result.isConfirmed) {
            try {
               await deleteDoc(doc(db, "imc", idItem));

               Swal.fire(
                  'Eliminado!',
                  'El registro ha sido eliminado con éxito.',
                  'success'
               )

               setChange(true)
            } catch (e) {
               console.log(e);

               Swal.fire(
                  'Error 404!',
                  'Oppps! Se ha sucitado un error, ¡Inténtalo mas luego!.',
                  'error'
               )
            }
         }
      })
   }

   return (
      <>
         <table className="table table-sm table-bordered">
            <thead className="">
               <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Peso</th>
                  <th scope="col">Estatura</th>
                  <th scope="col">IMC</th>
                  <th scope="col">Cla. OMS</th>
                  <th scope="col">Des. Popular</th>
                  <th scope="col">Eliminar</th>
               </tr>
            </thead>
            <tbody>
               {
                  (change)
                     ?  <tr>
                           <td colSpan="8" className="table-danger text-center">Cargando...</td>
                        </tr>
                     :  getData.map((item) => (
                           <Items key={item.id} item={item} indice={++indice} deleteItem={deleteItem} />
                        ))
               }
            </tbody>
         </table>
      </>
   );
}

export default ResultList;
