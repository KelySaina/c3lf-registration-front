import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import InputAdornment from '@mui/material/InputAdornment';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

function AllMembers() {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const HOST = "https://api.serveo.net"
    const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IktlbHlTYWluYSIsImlhdCI6MTcwNTkxMzY0MX0.0MEgaJgMju6pqAu2TLqFmOV7zsPi6EDs4uoKXk1HvzM"

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


    return (
        <>
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
                        <Typography className="smaller-text"><b>{filteredMembers.length} </b>{filteredMembers.length > 1 ? "members" : "member"} found</Typography>
                    </div>
                    <div>
                        <h1 className="bold-text">{members.length}</h1>
                        <h2 className="smaller-text">{members.length > 1 ? "members" : "member"}</h2>
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
            <ScrollToTopButton />
        </>
    );
}

export default AllMembers;
