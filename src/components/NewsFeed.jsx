import NewsArticle from "./NewsArticle";
import { v4 as uuidv4 } from "uuid";

const NewsFeed = (props) => {
  const { articles } = props;
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
