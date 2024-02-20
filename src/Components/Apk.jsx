import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

function Apk() {

    const getApp = () => {
        window.location.href = '/apk/C3LF QR.apk'
    }


    return (

        <>
            <Typography align="center" variant='h5' style={{ marginTop: '5%' }}>
                Discover the modern convenience of virtual badges to verify your registration within our members' community.
                <br />Click the button below to download the app and your badge is just one click away.
                <br />Embrace this streamlined process and become part of our vibrant community with ease.
            </Typography>
            <br /><br />
            <Button onClick={() => getApp()} variant='contained' startIcon={<DownloadForOfflineIcon />} style={{ width: '240px', height: '80px' }}>
                Download APK Now
            </Button>
        </>
    )
}

export default Apk;
