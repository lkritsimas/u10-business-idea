import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

interface ProfileCardProps {
  image?: string;
  username?: string;
  age?: number;
  distance?: number;
  occupation?: string;
  company?: string;
}

interface GithubCardProps {
  image?: string;
  username?: string;
  commits?: number;
  projects?: number;
}

interface CardProps {
  profileData?: ProfileCardProps;
  githubData?: GithubCardProps;
}

const useStyles = makeStyles({
  overlay: {
    width: '100%',
    height: '100%',
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
    color: 'white',
    textShadow: '1px 1px 1px black',
  },
  profilePhoto: {
    height: '100vh',
    maxHeight: '800px',
  },
  paper: {
    maxWidth: '640px',
    maxHeight: '800px',
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: '0.5rem',
  },
  profileName: {
    fontWeight: 500,
    fontSize: '1.2rem',
  },
  profileText: {
    fontSize: '0.9rem',
    fontStyle: 'italic',
  },
  githubName: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
  },
  githubText: {
    fontSize: '0.8rem',
  },
  githubInsideContainer: {
    justifyContent: 'flex-end',
  },
  gridContainer: {
    padding: '1rem',
    alignContent: 'flex-end',
    height: '100%',
  },
});


export const ProfileCard: React.FC<CardProps> = ({
  // Mock data
  profileData = {
    // image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.-Uc1Nsa_FB0a5QR1pdnT5AHaJQ%26pid%3DApi&f=1',
    image: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2018/12/The-Office-Michael-Scott-cringe-square.jpg',
    username: 'Michael Scott',
    age: 45,
    distance: 45000,
    occupation: 'Rainmaker',
    company: 'Dunder Mifflin',
  },
  githubData = {
    image: 'https://assets.rbl.ms/10690954/980x.jpg',
    username: 'jellyLover',
    commits: 357,
    projects: 21,
  },
}: CardProps) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper}>
      <Card elevation={0}>
        {/* component="img" */}
        <CardMedia image={profileData.image} className={classes.profilePhoto}>
          <CardContent className={classes.overlay}>
            <Grid container className={classes.gridContainer}>
              <Grid item xs={6}>
                <Typography className={classes.profileName}>
                  {`${profileData.username}, ${profileData.age}`}
                </Typography>
                <Typography className={classes.profileText}>
                  {`${profileData.occupation}`}
                  {profileData.company ? ` at ${profileData.company}` : ''}
                </Typography>
                <Typography className={classes.profileText}>
                  {`${profileData.distance} Miles away`}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {githubData
                  ? (
                    <Grid container className={classes.githubInsideContainer}>
                      <Avatar alt="github image" src={githubData.image} className={classes.avatar} />
                      <Grid>
                        <Typography className={classes.githubName}>
                          {githubData.username}
                        </Typography>
                        <Typography className={classes.githubText}>
                          {`${githubData.commits} Commits`}
                        </Typography>
                        <Typography className={classes.githubText}>
                          {`${githubData.projects} Projects`}
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                  : ''}
              </Grid>
            </Grid>
          </CardContent>
        </CardMedia>
      </Card>
    </Paper>
  );
};
