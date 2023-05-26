import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const nav = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            nav('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>{children}</>
    );
};

export default ProtectedRoute;