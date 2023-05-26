import { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const AuthContext = createContext();

const AuthProvider = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const nav = useNavigate();
    const auth = getAuth();
    useEffect(() => {
        const unsubcribed = auth.onIdTokenChanged((user) => {
            if (user?.uid) {
                setUser(user);
                if (user.accessToken !== localStorage.getItem('accessToken')) {
                    localStorage.setItem('accessToken', user.accessToken);
                    window.location.reload();
                }
                setIsLoading(false);
                return;
            }
            // Reset user info
            setUser({});
            localStorage.clear();
            setIsLoading(false);
            nav('/login');
        });

        return () => {
            unsubcribed();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {isLoading ? <CircularProgress /> : <Outlet />}
        </AuthContext.Provider>
    );
};

export default AuthProvider;