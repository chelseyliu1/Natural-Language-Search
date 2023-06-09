import './home.css';
import titleimg from './Title.png'
import React from 'react';
import { Container, InputAdornment, TextField, Box } from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

export let picId = [];

export const setPicId = (newPicId) => {
    picId = newPicId;
};

export const getPicId = () => {
    return picId;
};

function Home() {
    const baseURL = 'http://127.0.0.1:8000/search/';
    const [searchTerm, setSearchTerm] = useState("");
    const searchWord = searchTerm.split(' ').join('_')
    const getPics = () => {
        axios.get(baseURL + searchWord)
            .then((response) => {
                setPicId(response.data);
                let path = `display`;
                navigate(path);
                console.log(picId)
                console.log('get corresponding pictures with key word: ' + searchWord)
            })
            .catch(err => {
                console.log(err)

            })
    }

    let navigate = useNavigate();

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="Home">
            <div className="title-logo">
                <img src={titleimg} style={{ marginTop: 370, alignSelf: 'center' }} />
            </div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="20vh"
            >
                <TextField
                    id="search"
                    type="search"
                    InputLabelProps={{ style: { color: '#CB8A7C' } }}
                    label="Please Enter Keywords for Image Search"
                    value={searchTerm}
                    onChange={handleChange}
                    sx={{ width: 600, borderColor: '#CB8A7C' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <Button onClick={() => { getPics(); }} sx={{
                    background: '#CB8A7C', ':hover': {
                        bgcolor: '#E2745D',
                        color: 'white',
                    },
                }} variant="contained" size="large" style={{ marginLeft: 20, marginTop: 5 }}>Search</Button>
            </Box>
        </div>

    );
}

export default Home;