import Container from "@mui/material/Container";
import NewsFeed from "./components/NewsFeed";
import NewsHeader from "./components/NewsHeader";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null);
  const debouncedAPICall = useRef(null);

  async function loadArticles(query = "", signal) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${query}&country=us&apiKey=${import.meta.env.VITE_API_KEY}`,
      { signal },
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
    debouncedAPICall.current = debounce((newQuery) => {
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);

      loadArticles(newQuery, controller.signal)
        .then((newData) => {
          setArticles(newData);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error("Failed to load articles:", err);
            setLoading(false);
          }
        });
    }, 512);

    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);

    loadArticles("", controller.signal)
      .then((newData) => {
        setArticles(newData);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load articles:", err);
          setLoading(false);
        }
      });

    return () => {
      debouncedAPICall.current?.cancel();
      controllerRef.current?.abort();
    };
  }, []);

  const handleSearchChange = (newQuery) => {
    debouncedAPICall.current?.(newQuery);
  };

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      <NewsFeed articles={articles} loading={loading} />
    </Container>
  );
}

export default App;
