import React, { useCallback, useState } from 'react';
import QrReader from 'react-qr-scanner';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ProfileCard from './ProfileCard';
import { ToastContainer, toast } from 'react-toastify';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import Typography from '@mui/material/Typography';

function Scanner() {
    const [qrData, setQrData] = useState('');
    const [openQRScanner, setOpenQRScanner] = useState(false);
    const [userData, setUserData] = useState({});
    const [facingMode, setFacingMode] = useState('user');
    const HOST = "https://api.serveo.net"

    const handleScan = useCallback(data => {
        if (data) {
            setQrData(data.text);
            setOpenQRScanner(false);
            checkMember(data.text);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleError = err => {
        toast.error(err)
    };

    const mediaConstraints = {
        video: { facingMode: facingMode }
    };

    const toggleCamera = () => {
        setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
    };

    const checkMember = async (token) => {
        try {
            const response = await axios.post(`${HOST}/graphql`, {
                query: `
                    mutation {
                        loginMember(
                            token: "${token}"
                        ) {
                            matricule
                            username
                            level
                            paid
                            age
                        }
                    }
                `,
            });

            setUserData(response.data.data.loginMember);
            console.log(userData)

        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='container'>
            <ToastContainer autoClose={1000} />
            {openQRScanner ? (
                <>
                    <Button onClick={toggleCamera} startIcon={<CameraswitchIcon />}>
                        Switch View
                    </Button>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '300px', height: '300px' }}
                        facingMode={facingMode}
                        constraints={mediaConstraints}
                    />
                </>
            ) : (
                qrData ? (
                    <>
                        <div className='cards-container'>
                            <ProfileCard
                                username={userData.username}
                                level={userData.level}
                                matricule={userData.matricule}
                                paid={userData.paid ? "4000" : "0"}
                                age={userData.age ? userData.age : "18"}
                                avatar={userData.imgUrl ? userData.imgUrl : "./images/c3lf.jpg"}
                            />
                        </div>
                        <div>
                            <Button onClick={() => setOpenQRScanner(true)} variant='contained' startIcon={<QrCodeScannerIcon />}>
                                Scan Again
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <Typography align="center" variant='h5' style={{ marginTop: '5%' }}>
                            Discover the modern convenience of virtual badges to verify your registration within our members' community.
                            <br />Click the button below to scan your unique QR code and confirm your membership.
                            <br />Embrace this streamlined process and become part of our vibrant community with ease.
                        </Typography>
                        <br /><br />
                        <Button onClick={() => setOpenQRScanner(true)} variant='contained' startIcon={<QrCodeScannerIcon />} style={{ width: '240px', height: '80px' }}>
                            Scan QR Now
                        </Button>
                    </>
                )
            )}
        </div>
    );
}

export default Scanner;
