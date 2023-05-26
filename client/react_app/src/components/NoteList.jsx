import { Box, Card, CardContent, Grid, List, Typography } from '@mui/material';
import { Link, Outlet, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import AddNote from './AddNote';
import moment from 'moment';

const NoteList = () => {
    const nav = useNavigate();
    const { noteId, folderId } = useParams();
    const { folder } = useLoaderData() || {};
    // console.log('NoteList', folder);
    console.log({ noteId });
    const [activeNoteId, setActiveNoteId] = useState(noteId || folder?.notes?.[0]?.id);
    useLayoutEffect(() => {
        if (noteId) setActiveNoteId(noteId);
    }, [noteId]);

    useLayoutEffect(() => {
        if (folder?.notes?.[0]?.id) {
            nav(`note/${folder.notes[0].id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [folder?.notes?.[0]?.id]);

    return (
        <Grid container height={'100%'}>
            <Grid item xs={4}>
                <List sx={{
                    width: '100%',
                    maxWidth: '360px',
                    bgcolor: '#F0EBE3',
                    height: '100%',
                    padding: '10px',
                    textAlign: 'left',
                    overflowY: 'auto'
                }}

                    subheader={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                                Notes
                            </Typography>
                            <AddNote folderId={folderId} />
                        </Box>
                    }
                >

                    {folder?.notes?.map(({ id, content, updatedAt }) => {
                        return (
                            <Link
                                key={id}
                                to={`note/${id}`}
                                style={{ textDecoration: 'none', margin: '5px 0 5px 0', display: 'block' }}
                            >
                                <Card style={{ backgroundColor: id === activeNoteId ? 'rgb(255,211,140)' : '' }}>
                                    <CardContent sx={{ '&:last-child': { pb: '10px', padding: '10px' } }}>
                                        <div style={{ fontSize: 14, fontWeight: 'bold' }}
                                            dangerouslySetInnerHTML={{ __html: `${content.substring(0, 30) || 'Empty'}` }}
                                        />
                                        <Typography sx={{ fontSize: '10px' }}>{moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </List>

            </Grid>
            <Grid item xs={8}><Outlet /></Grid>
        </Grid>
    );
};

export default NoteList;