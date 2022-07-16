import { useState } from 'react'

import Formulario from "./components/Formulario";
import ResultList from "./components/ResultList";

function App() {
   const [change, setChange] = useState(true)

   return (
      <>
         <header className="header">
            CALCULAR MASA CORPORAL
         </header>

         <div className='container mt-3 mb-3'>   
            <div className="row">
               <div className="col-md-4 mb-3">
                  <Formulario setChange={setChange} />
               </div>
               <div className="col-md-8 mb-3 table-responsive">
                  <ResultList change={change} setChange={setChange} />
               </div>
            </div>
         </div>
   
         <footer className="footer">
            Creado por <b>CharlsDEV</b> || © Todos los derechos reservados.
         </footer>
      </>
   )
}

export default App