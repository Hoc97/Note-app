import { Typography, Button } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../services/api';

const Login = () => {
    const nav = useNavigate();
    const auth = getAuth();
    const { user } = useContext(AuthContext);
    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const { user: { uid, displayName } } = await signInWithPopup(auth, provider);
        const query = `mutation register($uid: String!, $name: String!) {
                register(uid: $uid, name: $name) {
                  uid
                  name
                }
              }`;
        await postLogin(query, uid, displayName);
    };
    useEffect(() => {
        if (user.uid) {
            nav('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <>
            <Typography variant='h5' sx={{ marginBottom: '10px' }}>Welcome to Note app</Typography>
            <Button variant='outlined' onClick={handleLoginWithGoogle}>
                Login
            </Button>
        </>
    );
};

export default Login;