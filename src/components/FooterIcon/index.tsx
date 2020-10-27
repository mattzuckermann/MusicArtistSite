import React, { useState } from 'react'
import navigator from '../../navigator';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    mediaIcons: {
        width: '60px',
        margin: '30px 15px 15px 15px',
        '@media(max-width: 614px)': {
            width: '60px',
            margin: '10px 50px -15px 50px',
        },
        '@media(max-width: 464px)': {
            margin: '10px 35px -10px 35px',
        },
        '@media(max-width: 380px)': {
            margin: '10px 25px -10px 25px',
        },
        '@media(max-width: 330px)': {
            margin: '10px 20px -10px 20px',
        },
    },
});


const FooterIcon = ({ link, allCloudinaryMedia, unhighlightedIndex, highlightedIndex }) => {
    const classes = useStyles();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
                <img 
                    src={!isHovered
                            ? allCloudinaryMedia.edges[unhighlightedIndex]?.node.secure_url
                            : allCloudinaryMedia.edges[highlightedIndex]?.node.secure_url}
                    className={classes.mediaIcons}
                    onMouseEnter={() => {
                        if (!navigator()) setIsHovered(true)
                    }}
                    onMouseLeave={() => {
                        if (!navigator()) setIsHovered(false)
                    }}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                />
            </a>
        </>
    )
}

export default FooterIcon;
