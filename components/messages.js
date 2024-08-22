import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
    };
    const navigate = useNavigate();
    // Certifique-se de que REACT_APP_API_URL está corretamente definida no .env
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/messages/create/`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setContent(''); // Limpa o campo após envio
        navigate('/'); // Redireciona para a página inicial
      } else {
        alert('Erro ao enviar os dados.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao enviar os dados.');
    }
  };

  return (
    <div>
      <h1>Criar Novo Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Content:</label>
          <input 
            type="text" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CreatePost;
