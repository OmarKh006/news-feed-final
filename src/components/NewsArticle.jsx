import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

function NewsArticle(props) {
  const { image, title, author, description, publishedAt, url } = props;
  return (
    <StyledCard>
      <StyledLink target="_blank" href={url}>
        <CardActionArea>
          {image && (
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt="Sample article"
            />
          )}
          {(title || description) && (
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
            </CardContent>
          )}
        </CardActionArea>
      </StyledLink>
      {(author || publishedAt) && (
        <Box p={2}>
          <Typography variant="caption" color="textSecondary" display="block">
            {author}
          </Typography>
          {publishedAt && (
            <Typography variant="caption" color="textSecondary">
              {new Date(publishedAt).toLocaleDateString()}
            </Typography>
          )}
        </Box>
      )}
    </StyledCard>
  );
}

export default NewsArticle;
