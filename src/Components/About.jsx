import * as React from 'react';
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                C3LF | Kely Saina
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cardsPrincipal = [
    {
        userProfile: "./images/fify.jpg",
        nom: "Fify",
        niveau: "M1",
        fonction: "President",
        fbProfile: "https://web.facebook.com/zaratiana.nely.94"
    },
    {
        userProfile: "./images/stephan.jpg",
        nom: "Stephan",
        niveau: "M1",
        fonction: "Mentor",
        fbProfile: "https://web.facebook.com/antsivaniaina"
    },
    {
        userProfile: "./images/default.avif",
        nom: "Charlot",
        niveau: "M1",
        fonction: "Mentor",
        fbProfile: "https://web.facebook.com/axm.lot"
    },
    {
        userProfile: "./images/default.avif",
        nom: "Kely Saina",
        niveau: "M1",
        fonction: "Mentor",
        fbProfile: "https://web.facebook.com/KelySainaKS"
    },
];
const cardsSecondary = [
    {
        userProfile: "./images/tsimijaly.jpg",
        nom: "Tsimijaly",
        niveau: "L3",
        fonction: "Mentor",
        fbProfile: "https://web.facebook.com/nomena.tsimijaly"
    },
    {
        userProfile: "./images/default.avif",
        nom: "Landry",
        niveau: "L3",
        fonction: "Mentor",
        fbProfile: "https://web.facebook.com/profile.php?id=100073363435433"
    },
]

const ScrollToTopButton = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <IconButton
            onClick={handleScrollToTop}
            color="primary"
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}
        >
            <KeyboardArrowUpIcon />
        </IconButton>
    );
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Who are we?
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: { xs: 'column', md: 'row' }, }}>
                            <Typography variant="h5" align="justify" color="text.secondary" paragraph width={{ xs: '80%', md: '60%' }} >
                                <b>C3LF</b> stands out among the many clubs at ENI with its primary goal of guiding newcomers through the myriad possibilities that both <b>Linux</b> and <b>open-source projects</b> have to offer.
                                <br />Our club is dedicated to providing valuable insights and practical knowledge, ensuring that individuals, whether new to the world of technology or experienced enthusiasts, can explore and harness the vast potential of Linux and open-source initiatives.
                                <br />Join us on this journey of discovery and empowerment!
                            </Typography>
                            <img src='./images/c3lf.jpg' alt='C3LF' width="40%" />
                        </Box>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={() => { window.location.href = "https://web.facebook.com/profile.php?id=100085653040814" }} startIcon={<FacebookIcon />}>Like and follow us on Facebook</Button>
                        </Stack>
                    </Container>

                    <Container maxWidth="lg">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            How do we proceed?
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: { xs: 'column', md: 'row' }, }}>
                            <img src='./images/tuto.avif' alt='tuto' width="40%" />
                            <Typography variant="h5" align="justify" color="text.secondary" paragraph width={{ xs: '80%', md: '60%' }} >
                                Join us every <b>Saturday</b> for enlightening tutorials and engaging discussions as we navigate the vast world of Linux together.
                                <br />Our <b>tutorials</b> provide valuable insights into mastering Linux, and we follow up with <b>practical demos</b> to reinforce your learning.
                                <br />Whether you're a seasoned Linux enthusiast or just starting your journey, our club welcomes <b>open discussions</b> and encourages questions about Linux and various open-source projects.
                                <br />Unleash the power of open source with us!
                            </Typography>
                        </Box>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={() => { window.location.href = "/register" }} startIcon={<HowToRegIcon />}>Register Now</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Our Team
                    </Typography>
                    <Typography variant="h5" align="justify" color="text.secondary" paragraph width="40%">
                        Mains
                    </Typography>
                    <Grid container spacing={4}>
                        {cardsPrincipal.map((card, i) => (
                            <Grid item key={i} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '75%',
                                        }}
                                        image={card.userProfile}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.nom}
                                        </Typography>
                                        <Typography>
                                            {card.niveau} | {card.fonction}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => { window.open(card.fbProfile, '_blank'); }}>View Facebook Profile</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant="h5" align="justify" color="text.secondary" paragraph width="40%" style={{ marginTop: "40px" }}>
                        Newcomers
                    </Typography>
                    <Grid container spacing={4}>
                        {cardsSecondary.map((card, i) => (
                            <Grid item key={i} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '75%',
                                        }}
                                        image={card.userProfile}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.nom}
                                        </Typography>
                                        <Typography>
                                            {card.niveau} | {card.fonction}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => { window.open(card.fbProfile, '_blank'); }}>View Facebook Profile</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <ScrollToTopButton />
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Copyright />
            </Box>
        </ThemeProvider>
    );
}