
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useSubmit } from 'react-router-dom';
import { NoteAddOutlined } from '@mui/icons-material';

const AddNote = ({ folderId }) => {
    const nav = useNavigate();
    const submit = useSubmit();
    const [newNoteName, setNewNoteName] = useState('Note');
    const [open, setOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const popupName = searchParams.get('popup');
    const handleOpenPopUp = () => {
        setSearchParams({ popup: 'add-note' });
    };

    const handleClose = () => {
        setOpen(false);
        setNewNoteName('Note');
        nav(-1);
    };

    const handleNewNoteName = (e) => {
        setNewNoteName(e.target.value);
    };
    console.log({ newNoteName });
    const handleAddNewNote = async () => {
        submit(
            {
                content: newNoteName, folderId
            }, { method: 'post', action: `/folders/${folderId}` });
        // const { addNote } = await addNewNoteFunc({ content: newNoteName, folderId });
        // console.log({ addNote });
        handleClose();
    };

    useEffect(() => {
        if (popupName === 'add-note') {
            setOpen(true);
        }
    }, [popupName]);
    return (
        <div>
            <Tooltip title='Add Note' onClick={handleOpenPopUp}>
                <IconButton size='small'>
                    <NoteAddOutlined sx={{ color: 'black' }} />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} sx={{ mt: '-100px' }}>
                <DialogTitle>New Note</DialogTitle>
                <DialogContent >
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Note name'
                        fullWidth
                        size='small'
                        variant='standard'
                        sx={{ width: '400px' }}
                        autoComplete='off'
                        value={newNoteName}
                        onChange={handleNewNoteName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddNewNote}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddNote;