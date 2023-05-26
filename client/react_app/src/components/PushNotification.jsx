import { Notifications } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { createClient } from 'graphql-ws';
import { Badge, Menu, MenuItem } from '@mui/material';

const subscriptionEndPoint = import.meta.env.VITE_APP_SUBSCRIPTION_URL;
const client = createClient({
    url: subscriptionEndPoint,
});

const query = `subscription Notification {
    notification {
      message
    }
  }
  `;


const PushNotification = () => {
    const [invisible, setInvisible] = useState(true);
    const [notification, setNotification] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (e) => {
        if (!invisible) {
            setAnchorEl(e.target);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setNotification('');
        setInvisible(true);
    };
    useEffect(() => {
        // subscription
        (async () => {
            const onNext = (data) => {
                /* handle incoming values */
                setInvisible(false);
                const message = data?.data?.notification?.message;
                setNotification(message);
            };
            await new Promise((resolve, reject) => {
                client.subscribe(
                    {
                        query: query,
                    },
                    {
                        next: onNext,
                        error: reject,
                        complete: resolve,
                    },
                );
            });

            expect(onNext).toBeCalledTimes(5); // we say "Hi" in 5 languages
        })();
    }, []);

    return (
        <Badge badgeContent={1} color="primary" invisible={invisible} >
            <Notifications onClick={handleOpen} sx={{ cursor: invisible === false && 'pointer', ml: '10px' }} />
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
                <MenuItem>{notification}</MenuItem>
            </Menu>
        </Badge>
    );
};

export default PushNotification;