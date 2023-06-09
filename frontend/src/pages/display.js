import React, { useState } from 'react';
import './display.css';
import axios from 'axios';
import { getPicId, picId } from './home';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

//let picId = [1, 2, 3]

const Display = () => {
    //console.log(JSON.stringify(picId))
    const pictures = JSON.stringify(picId);
    const topPics = JSON.parse(pictures).topk;
    //console.log(topPics)
    const itemData = []
    for (let i = 0; i < topPics.length; i++) {
        let s1 = {
            img: 'https://unsplash.com/photos/' + topPics[i] + '/download?w=320',
        }
        itemData.push(s1);
        console.log(s1)
    }
    return (
        <div className="images" >
            <h1 className="heading">Check your pics</h1>
            <ImageList variant="masonry" cols={3} gap={8}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
};

export default Display;