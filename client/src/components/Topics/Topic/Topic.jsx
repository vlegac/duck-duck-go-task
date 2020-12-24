import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import { topicStyles } from "./styles";

export const Topic = ({ title, url }) => {
  const classes = topicStyles();

  const handleRedirect = React.useCallback(() => {
    window.location.assign(url);
  }, [url]);
  return (
    <Card className={classes.root} onClick={handleRedirect}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>{title.substring(0, 2)}</Avatar>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
