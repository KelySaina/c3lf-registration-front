import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import InputAdornment from '@mui/material/InputAdornment';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function AllMembers() {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const HOST = process.env.REACT_APP_HOST
    const ADMIN_TOKEN = process.env.REACT_APP_ADMIN_TOKEN
    const [isAdmin, setIsAdmin] = useState(false)

    const getAllMembers = async () => {
        try {
            const response = await axios.post(
                `${HOST}/secure-graphql`,
                {
                    query: `
                    query {
                        getAllMembers {
                            matricule
                            username
                            level
                            paid
                            age
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

            const users = response.data.data.getAllMembers;
            setMembers(users);
            setFilteredMembers(users)

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllMembers();
    }, []);

    const handleSearch = (e) => {
        let searchMatricule = e.target.value

        const filteredMembers = members.filter(member =>
            member.matricule.includes(searchMatricule)
        );
        setFilteredMembers(filteredMembers);
    };

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

    const handleLog = (e) => {
        const adminPass = process.env.REACT_APP_ADMIN_PASS
        console.log(adminPass)
        let pass = e.target.value;
        if (pass === adminPass) {
            setIsAdmin(true)
        }
    }

    const [isVisible, setIsVisible] = useState(false)
    const handleVisible = () => {
        isVisible ? setIsVisible(false) : setIsVisible(true)
    }



    return (
        <>
            {
                isAdmin ? (

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "10px" }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                                <TextField
                                    size="small"
                                    type="text"
                                    placeholder="Search by Matricule"
                                    onChange={handleSearch}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <ManageSearchIcon />
                                            </InputAdornment>,
                                    }}
                                />
                            </div>
                            <div>
                                <h1 className="bold-text">{filteredMembers.length}/{members.length}</h1>
                                <h2 className="smaller-text">members found</h2>
                            </div>
                        </div>
                        <div className="all-members-container" style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around'
                        }}>
                            {filteredMembers.map((member) => (
                                <ProfileCard
                                    key={member.matricule}
                                    username={member.username}
                                    level={member.level}
                                    matricule={member.matricule}
                                    paid={member.paid ? "4000" : "-"}
                                    age={member.age ? member.age : "-"}
                                    avatar={member.imgUrl ? member.imgUrl : "./images/c3lf.jpg"}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h3">
                            Enter Administrator password to see all members
                        </Typography>
                        <TextField
                            size="small"
                            type={isVisible ? "text" : "password"}
                            label="Admin Password"
                            onChange={handleLog}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end" onClick={handleVisible}>
                                        {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </InputAdornment>,
                            }}
                            style={{ width: '50%', margin: '50px 0' }}
                        />
                    </div>

                )
            }
            <ScrollToTopButton />

        </>
    );
}

export default AllMembers;
