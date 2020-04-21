import React, {useState, useEffect} from "react";
import api from './services/api.js'


import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(Response => {
      setRepository(Response.data);
    })
  },[]) 


   async function handleAddRepository() {
    const response = await api.post('repositories',{
      title : 'Teste',
      url : 'http://www.google.com',
      techs : ['NodeJS','ReactJS']
    })

    const repository = response.data;

    setRepository([... repositories, repository]);
  }

  async function handleRemoveRepository(id) { 
    await api.delete('repositories/' + id);
    
    setRepository(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>{repository.title} 
              <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
