import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const LoadingArticle = () => {
  return (
    <StyledCard>
      <CardActionArea>
        <Skeleton variant="rectangular" height={200} animation="wave" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            <Skeleton width="70%" />
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <Skeleton width="100%" />
            <Skeleton width="85%" />
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Typography variant="caption" color="textSecondary" display="block">
          <Skeleton width="40%" />
        </Typography>
        <Typography variant="caption" color="textSecondary">
          <Skeleton width="30%" />
        </Typography>
      </Box>
    </StyledCard>
  );
};

export default LoadingArticle;
