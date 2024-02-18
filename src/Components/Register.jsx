import * as React from 'react';
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'
import { QRCode } from 'react-qrcode-logo';
import Dialog from '@mui/material/Dialog';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.facebook.com/KelySainaKS">
                C3LF | KelySaina
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
    const [token, setToken] = useState('');
    const [openModal, setOpenModal] = useState(false)
    const [userName, setUserName] = useState(false)
    const [emptyFields, setEmptyFields] = useState([]);
    const allowedCharactersRegex = /^[a-zA-Z\s-]*$/;
    const numberRegex = /d/
    const HOST = process.env.REACT_APP_HOST
    //const ADMIN_TOKEN = process.env.REACT_APP_ADMIN_TOKEN

    const [f_name, setFName] = useState('');
    const [f_name_error, setFNameError] = useState(false);
    const handleFNameChange = (newValue) => {
        if (!allowedCharactersRegex.test(newValue)) {
            setFNameError(true)
        } else {
            setFNameError(false)
        }
        setFName(newValue);
    };

    const [l_name, setLName] = useState('');
    const [l_name_error, setLNameError] = useState(false);
    const handleLNameChange = (newValue) => {
        if (!allowedCharactersRegex.test(newValue)) {
            setLNameError(true)
        } else {
            setLNameError(false)
        }
        setLName(newValue);
    };

    const [age, setAge] = useState('');
    const [age_error, setAgeError] = useState(false);
    const handleAgeChange = (newValue) => {
        if (numberRegex.test(newValue)) {
            setAgeError(true)
        } else {
            setAgeError(false)
        }
        setAge(newValue);
    };

    const [matricule, setMatricule] = useState('');
    const hanldeMatriculeChange = (newValue) => {
        setMatricule(newValue);
    };

    const [level, setLevel] = useState('');
    const handleLevelChange = (newValue) => {
        setLevel(newValue);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const emptyFieldsArray = [];

        if (f_name.trim() === '' || !allowedCharactersRegex.test(f_name)) {
            emptyFieldsArray.push('f_name');
        }

        if (matricule.trim() === '') {
            emptyFieldsArray.push('matricule');
        }

        if (level.trim() === '') {
            emptyFieldsArray.push('level');
        }

        if (emptyFieldsArray.length > 0) {
            setEmptyFields(emptyFieldsArray);
            toast.error("Invalid field(s)")
            return;
        }

        const username = f_name + " " + l_name;

        try {
            const response = await axios.post(`${HOST}/graphql`, {
                query: `
                    mutation {
                    registerMember(
                        matricule: "${matricule}",
                        username: "${username}",
                        level: "${level}",
                        age: ${age}
                    ) {
                        token
                        member{
                            username
                        }
                    }
                    }
                `,
            });

            if (response.data.errors) {
                const errorMessage = response.data.errors[0].message;
                toast.error(errorMessage)
            } else {
                toast.success("Member registered successfully")
                const token = response.data.data.registerMember.token;
                const username = response.data.data.registerMember.member.username;
                setToken(token)
                setOpenModal(true)
                setUserName(username)
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const downloadQr = () => {
        try {
            const canvas = document.getElementById('qrToken');
            const downloadLink = document.createElement('a');
            const uniqueId = uuidv4();
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.download = `QR_code_C3LF_${userName.replace(/ /g, '_')}_${uniqueId}.png`;
            downloadLink.click();
            setOpenModal(false)
            setFName('')
            setLName('')
            setMatricule('')
            setLevel('')
            setAge()
        } catch (error) {
            console.error('Error downloading QR code:', error);
        }
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <div style={{ border: '3px solid #0504aa', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '12px' }} >
                    <h3>QR-Code</h3>
                    <Typography width="75%">Keep this QR Code as it will be used to verify your identity as a member of C3LF</Typography>
                    <QRCode
                        id='qrToken'
                        removeQrCodeBehindLogo={true}
                        value={token}
                        fgColor='#0504aa'
                        logoImage='./images/c3lf.png'
                        logoOpacity={1}
                        logoHeight={50}
                        logoWidth={50}
                        qrStyle='dots'
                        size={200}
                        logoPadding={2}
                        logoPaddingStyle='circle'
                        eyeRadius={15}
                        ecLevel='Q'
                        quietZone={20}
                        bgColor='#f8f8ff'
                    />
                    <Button color='primary' variant='contained' startIcon={<DownloadForOfflineIcon />} onClick={downloadQr}>
                        Download
                    </Button>
                </div>
            </Dialog>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <AssignmentIndIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        New Member Registration
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={f_name}
                                    onChange={(e) => handleFNameChange(e.target.value)}
                                    error={emptyFields.includes('f_name') || f_name_error ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value={l_name}
                                    onChange={(e) => handleLNameChange(e.target.value)}
                                    error={emptyFields.includes('l_name') || l_name_error ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="matricule"
                                    label="Matricule"
                                    name="matricule"
                                    value={matricule}
                                    onChange={(e) => hanldeMatriculeChange(e.target.value)}
                                    error={emptyFields.includes('matricule') ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type='number'
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    name="age"
                                    value={age}
                                    onChange={(e) => handleAgeChange(e.target.value)}
                                    error={emptyFields.includes('age') || age_error ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    id="level"
                                    label="Select Level"
                                    name="level"
                                    value={level}
                                    onChange={(e) => handleLevelChange(e.target.value)}
                                    error={emptyFields.includes('level') ? true : false}
                                >
                                    <MenuItem value="L1">L1</MenuItem>
                                    <MenuItem value="L2">L2</MenuItem>
                                    <MenuItem value="L3">L3</MenuItem>
                                    <MenuItem value="M1">M1</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleFormSubmit}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                Already have an account?
                                <Link href="/scan" variant="body2">
                                    Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
                <ToastContainer autoClose={1200} />
            </Container>
        </ThemeProvider>
    );
}

