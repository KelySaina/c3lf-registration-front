import React, { useEffect, useState, useRef } from "react";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Badge from '@mui/material/Badge';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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

const LeftSidePaper = styled(Paper)(({ theme }) => ({
    width: '20%',
    height: '65vh',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const RightSidePaper = styled(Paper)(({ theme }) => ({
    width: '60%',
    height: '65vh',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'left',
}));

export default function UserProfile() {
    const HOST = process.env.REACT_APP_HOST
    const ADMIN_TOKEN = process.env.REACT_APP_ADMIN_TOKEN
    const { matricule } = useParams()
    const [avatar, setAvatar] = useState(null)
    const [userInfos, setUserInfos] = useState({
        newAge: null,
        newNom: '',
        newSurnom: '',
        newLevel: '',
        newYear: '',
        newPaid: 'No'
    })
    const [stacticData, setStaticData] = useState({
        username: '',
        level: ''
    })

    const getMemberInfos = async () => {
        try {
            const response = await axios.post(
                `${HOST}/secure-graphql`,
                {
                    query: `
                    query {
                       getMemberByMatricule(matricule: "${matricule}") {
                        matricule
                        username
                        level
                        paid
                        age
                        year
                        imgUrl
                    }
                    }
                `,
                },
                {
                    headers: {
                        Authorization: `${ADMIN_TOKEN}`,
                    },
                }
            );

            const infosMatricule = response.data.data.getMemberByMatricule
            const fullName = infosMatricule.username;
            const [firstName, ...lastNameParts] = fullName.split(' ');

            const lastName = lastNameParts.join(' ');
            setUserInfos({
                newAge: infosMatricule.age,
                newNom: firstName,
                newSurnom: lastName,
                newLevel: infosMatricule.level,
                newYear: infosMatricule.year,
                newPaid: infosMatricule.paid ? "Yes" : "No"
            })
            setStaticData({
                username: fullName,
                level: infosMatricule.level
            })


            setAvatar(infosMatricule.imgUrl)


        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMemberInfos();
    }, [matricule]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfos((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const deleteMember = async () => {
        try {
            await axios.post(
                `${HOST}/secure-graphql`,
                {
                    query: `
                    mutation{
                        deleteMemberByMAtricule(matricule: "${matricule}") {
                            id
                        }
                    }`
                },
                {
                    headers: {
                        Authorization: `${ADMIN_TOKEN}`,
                    },
                }
            );

            toast.success("Data changes saved successfully", {
                onClose: () => {
                    handleClose()
                    window.location.href = "/members";
                },
            });

        } catch (err) {
            console.error('Error updating member:', err);
        }
    }

    const saveData = async () => {
        try {
            await axios.post(
                `${HOST}/secure-graphql`,
                {
                    query: `
                    mutation{
                        updateMemberByMatricule(matricule: "${matricule}", username: "${userInfos.newNom + " " + userInfos.newSurnom}", level: "${userInfos.newLevel}", age: ${userInfos.newAge}, paid: ${userInfos.newPaid === "Yes" ? true : false}, year: "${userInfos.newYear}") {
                            id
                        }
                    }`
                },
                {
                    headers: {
                        Authorization: `${ADMIN_TOKEN}`,
                    },
                }
            );

            toast.success("Data changes saved successfully")
        } catch (err) {
            console.error('Error updating member:', err);
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fileInputRef = useRef(null);

    const handleBadgeClick = () => {
        fileInputRef.current.click();  // Trigger click on the hidden file input
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await axios.post(
                    `${HOST}/upload-avatar/${matricule}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `${ADMIN_TOKEN}`,
                        },
                    }
                );

                console.log(response.data)

                getMemberInfos()

                toast.success("Avatar uploaded successfully");
            } catch (error) {
                console.error('Error uploading avatar:', error);
                toast.error("Error uploading avatar");
            }
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this information"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action is irreversible. You may have to re-enter the informations all over again
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" style={{ background: 'tomato', border: 'tomato' }}>Cancel</Button>
                    <Button onClick={deleteMember} variant="outlined">
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
            <Stack direction="row" spacing={3} sx={{ padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LeftSidePaper variant="outlined">
                    <div style={{ border: 'solid rgb(206, 206, 206) 1px', borderRadius: '50%' }}>

                        <Badge
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                <IconButton style={{ background: 'rgb(110, 110, 220)', color: "whitesmoke" }}>
                                    <AddPhotoAlternateIcon />
                                </IconButton>
                            }
                            overlap="circular"
                            onClick={handleBadgeClick}
                        >
                            <Avatar alt={stacticData.username} src={avatar} sx={{ width: '150px', height: '150px' }} />
                        </Badge>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Grid3x3Icon />
                                </ListItemIcon>
                                <ListItemText primary={matricule} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary={stacticData.username} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MilitaryTechIcon />
                                </ListItemIcon>
                                <ListItemText primary={stacticData.level} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </LeftSidePaper>

                <RightSidePaper variant="outlined">
                    <Typography variant='h5' align='left' style={{ marginBottom: '25px' }}><b>Edit Member Informations</b></Typography>

                    <Stack direction="row" spacing={3}>
                        <Stack direction="column" spacing={1} width={'50%'}>
                            <Typography align='left' fontSize={18}>Basic Info</Typography>
                            <label htmlFor="name">Name</label>
                            <TextField id="outlined-basic" name='newNom' variant="outlined" size='small' fullWidth value={userInfos.newNom} onChange={handleChange} />
                            <label htmlFor="">Surname</label>
                            <TextField id="outlined-basic" name='newSurnom' variant="outlined" size='small' fullWidth value={userInfos.newSurnom} onChange={handleChange} />
                            <label htmlFor="">Age</label>
                            <TextField id="outlined-basic" name='newAge' variant="outlined" size='small' fullWidth value={userInfos.newAge ? userInfos.newAge : ""} onChange={handleChange} />
                        </Stack>
                        <Stack direction="column" spacing={1} width={'50%'}>
                            <Typography align='left' fontSize={18}>Member Info</Typography>
                            <label htmlFor="">Current Level</label>
                            <TextField id="outlined-basic" name='newLevel' variant="outlined" size='small' fullWidth value={userInfos.newLevel} onChange={handleChange} />
                            <label htmlFor="">Member since</label>
                            <TextField id="outlined-basic" name='newYear' variant="outlined" size='small' fullWidth value={userInfos.newYear} onChange={handleChange} />
                            <label htmlFor="">Paid Inscription Fees</label>
                            <TextField id="outlined-basic" name='newPaid' variant="outlined" size='small' fullWidth value={userInfos.newPaid} onChange={handleChange} />
                        </Stack>
                    </Stack>
                    <Stack spacing={4} direction="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'right', marginTop: '30px' }}>
                        <Button variant="outlined" style={{ borderColor: 'tomato', color: 'tomato' }} startIcon={<DeleteForeverIcon />} onClick={handleClickOpen}>Delete Member</Button>
                        <Button variant="contained" startIcon={<SaveAsIcon />} onClick={saveData}>Save Changes</Button>
                    </Stack>

                </RightSidePaper>
                <ToastContainer autoClose={700} />
            </Stack>
            <Copyright sx={{ mt: 5 }} />
        </>
    );
}
