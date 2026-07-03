import NewsArticle from "./NewsArticle";
import Typography from "@mui/material/Typography";
import LoadingArticle from "./LoadingArticle";

const NewsFeed = (props) => {
  const { articles, loading, error } = props;

  if (!loading && !articles.length && !error) {
    return (
      <Typography
        align="center"
        variant="h6"
        color="common.white"
        marginTop={4}
      >
        No articles found.
      </Typography>
    );
  }

  return (
    <div>
      {loading &&
        Array.from({ length: 5 }).map((_, index) => (
          <LoadingArticle key={index} />
        ))}
      {!loading &&
        articles.map((article) => (
          <NewsArticle {...article} key={article.url ?? article.title} />
        ))}
    </div>
  );
};

export default NewsFeed;
