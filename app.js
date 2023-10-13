import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/articles');
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  const handleSubmit = async () => {
    try {
      const newArticle = { title, content };
      await axios.post('http://localhost:5000/articles', newArticle);
      setTitle('');
      setContent('');
      fetchArticles();
    } catch (error) {
      console.error("Error adding article:", error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  }

  return (
    <div className="App">
      <h1>Mini CMS</h1>
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>
        <button onClick={handleSubmit}>Add Article</button>
      </div>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <button onClick={() => handleDelete(article.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

