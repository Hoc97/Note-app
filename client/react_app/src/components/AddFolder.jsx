
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { addNewFolderFunc } from '../utils/queryUtil.jsx';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CreateNewFolderOutlined } from '@mui/icons-material';

const AddFolder = () => {
    const nav = useNavigate();
    const [newFolderName, setNewFolderName] = useState('');
    const [open, setOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const popupName = searchParams.get('popup');
    const handleOpenPopUp = () => {
        setSearchParams({ popup: 'add-folder' });
    };

    const handleClose = () => {
        setOpen(false);
        setNewFolderName('');
        nav(-1);
    };

    const handleNewFolderName = (e) => {
        setNewFolderName(e.target.value);
    };

    const handleAddNewFolder = async () => {
        const { addFolder } = await addNewFolderFunc({ name: newFolderName });
        console.log({ addFolder });
        handleClose();
    };

    useEffect(() => {
        if (popupName === 'add-folder') {
            setOpen(true);
        }
    }, [popupName]);
    return (
        <div>
            <Tooltip title='Add folder' onClick={handleOpenPopUp}>
                <IconButton size='small'>
                    <CreateNewFolderOutlined sx={{ color: 'white' }} />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} sx={{ mt: '-100px' }}>
                <DialogTitle>New Folder</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Folder name'
                        fullWidth
                        size='small'
                        variant='standard'
                        sx={{ width: '400px' }}
                        autoComplete='off'
                        value={newFolderName}
                        onChange={handleNewFolderName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddNewFolder}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddFolder;