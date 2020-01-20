import React, { useState, useEffect } from "react";
import api from './services/api';

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import "./components/DevItem"
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

// Componente   -> Função que retorna algum conteúdo HTML
// Estado       ->  Mantém o estado de uma informação que é manipulada por um componente.{lembrar do conceito de imutabilidade}
// Propriedade  -> Atributo de cada componente.


function App() {

  const [devs, setDevs] = useState([]);

  useEffect( () => {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  },[]);
  

  async function handleAddDev (data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
            
      <main>
        <ul>
          {devs.map( dev => (
              <DevItem key={dev._id} dev={dev}/>
          ))}
               
        </ul>

      </main>
    </div>
  );
}

export default App;
