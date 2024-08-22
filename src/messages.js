import React, { useState } from 'react';
import { redirect } from "react-router-dom";

function CreatePost() {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      content: content,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert('Dados enviados com sucesso!');
        setContent(''); // Limpa o campo após envio
        redirect('/')
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
