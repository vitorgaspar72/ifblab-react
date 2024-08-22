
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreatePost from './messages';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Lista de Dados</Link></li>
            <li><Link to="/create">Criar Novo Post</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/messages/`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Erro ao buscar os dados:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Dados</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <p>ID: {item.id}</p>
            <p>Conteúdo: {item.content}</p>
            <p>Criado em: {new Date(item.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
