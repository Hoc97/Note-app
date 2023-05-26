import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { getAuth } from 'firebase/auth';

const UserMenu = () => {
    const { user: { displayName, photoURL } } = useContext(AuthContext);
    const auth = getAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        auth.signOut();
    };

    const handleOpen = (e) => {
        setAnchorEl(e.target);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleOpen}>
                <Typography>{displayName}</Typography>
                <Avatar alt='avatar' src={photoURL} sx={{ width: 24, height: 24, marginLeft: '5px' }} />
            </Box>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;