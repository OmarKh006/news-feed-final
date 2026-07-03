import Container from "@mui/material/Container";
import NewsFeed from "./components/NewsFeed";
import NewsHeader from "./components/NewsHeader";
import { useEffect, useRef, useState, useCallback } from "react";
import { debounce } from "lodash";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const controllerRef = useRef(null);
  const debouncedAPICall = useRef(null);
  const pageNumber = useRef(1);
  const queryRef = useRef("");

  const PAGE_SIZE = 5;

  async function loadArticles(query = "", signal, page) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${query}&page=${page}&pageSize=${PAGE_SIZE}&country=us&apiKey=${import.meta.env.VITE_API_KEY}`,
      { signal },
    );
    const data = await response.json();
    if (data.status === "error") {
      setError(data.message);
      throw new Error(data.message);
    }
    return data.articles.map(
      ({ title, description, author, publishedAt, urlToImage }) => ({
        title,
        description,
        author,
        publishedAt,
        image: urlToImage,
      }),
    );
  }

  const fetchAndSetArticles = useCallback((query, page) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError("");

    loadArticles(query, controller.signal, page)
      .then((newData) => {
        setArticles(newData);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load articles:", err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    debouncedAPICall.current = debounce((newQuery) => {
      queryRef.current = newQuery;
      pageNumber.current = 1;
      fetchAndSetArticles(newQuery, pageNumber.current);
    }, 512);

    fetchAndSetArticles(queryRef.current, pageNumber.current);

    return () => {
      debouncedAPICall.current?.cancel();
      controllerRef.current?.abort();
    };
  }, [fetchAndSetArticles]);

  const handleSearchChange = (newQuery) => {
    debouncedAPICall.current?.(newQuery);
  };

  const nextClick = () => {
    if (articles.length < PAGE_SIZE) return;
    pageNumber.current += 1;
    fetchAndSetArticles(queryRef.current, pageNumber.current);
  };

  const previousClick = () => {
    if (pageNumber.current === 1) return;
    pageNumber.current -= 1;
    fetchAndSetArticles(queryRef.current, pageNumber.current);
  };

  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      <NewsFeed articles={articles} loading={loading} error={error} />
      {error.length ? (
        <Typography color="error" align="center">
          {"An Error Has Occured"}
        </Typography>
      ) : null}
      <Footer>
        <Button variant="outlined" onClick={previousClick} disabled={loading}>
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={nextClick}
          disabled={loading || articles.length < PAGE_SIZE}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
