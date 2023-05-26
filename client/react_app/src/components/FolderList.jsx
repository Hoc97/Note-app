import { Box, Card, CardContent, List, Typography } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddFolder from './AddFolder';

const FolderList = ({ folders }) => {
    const nav = useNavigate();
    const { folderId } = useParams();
    const [activeFolderId, setActiveFoderId] = useState(folderId || folders?.[0]?.id);
    useLayoutEffect(() => {
        if (folderId) setActiveFoderId(folderId);
    }, [folderId]);

    useLayoutEffect(() => {
        if (folders?.[0]?.id) {
            nav(`folders/${folders[0].id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [folders?.[0]?.id]);
    return (
        <List sx={{
            width: '100%',
            bgcolor: '#7D9D9C',
            height: '100%',
            padding: '10px',
            textAlign: 'left',
            overflowY: 'auto'
        }}
            subheader={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
                        Folders
                    </Typography>
                    <AddFolder />
                </Box>
            }
        >
            {
                folders?.map(({ id, name }) => {
                    return (
                        <Link key={id} to={`folders/${id}`} style={{
                            textDecoration: 'none', margin: '5px 0 5px 0', display: 'block'
                        }}>
                            <Card style={{ backgroundColor: id === activeFolderId ? 'rgb(255,211,140)' : '' }}>
                                <CardContent sx={{ '&:last-child': { pb: '10px' }, padding: '10px' }}>
                                    <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} >{name}</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })
            }
        </List>
    );
};

export default FolderList;