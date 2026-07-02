import NewsArticle from "./NewsArticle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuidv4 } from "uuid";

const NewsFeed = (props) => {
  const { articles, loading } = props;

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!articles.length) {
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
      {articles.map((article) => {
        article.uuid = uuidv4();
        return <NewsArticle {...article} key={article.uuid}></NewsArticle>;
      })}
    </div>
  );
};

export default NewsFeed;
