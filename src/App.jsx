import Container from "@mui/material/Container";
import NewsFeed from "./components/NewsFeed";
import NewsHeader from "./components/NewsHeader";
import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);

  async function loadArticles(query = "") {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${query}&country=us&apiKey=${import.meta.env.VITE_API_KEY}`,
    );
    const data = await response.json();
    return data.articles.map((article) => {
      const { title, description, author, publishedAt, urlToImage } = article;
      return {
        title,
        description,
        author,
        publishedAt,
        image: urlToImage,
      };
    });
  }

  useEffect(() => {
    loadArticles()
      .then(setArticles)
      .catch((err) => console.error("Failed to load articles:", err));
  }, []);

  const handleSearchChange = (newQuery) => {
    loadArticles(newQuery).then(setArticles);
  };

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      <NewsFeed articles={articles} />
    </Container>
  );
}

export default App;
