import { Outlet, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AuthProvider from '../context/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import ErrorPage from '../pages/ErrorPage';
import NoteList from '../components/NoteList';
import NoteDetail from '../components/NoteDetail';
import { addNewNoteFunc, foldersLoader, noteLoader, notesLoader, updateNoteFunc } from '../utils/queryUtil';



const AuthLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );

};

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: (
                    <ProtectedRoute >
                        <Home />
                    </ProtectedRoute>
                ),
                loader: foldersLoader,
                children: [
                    {
                        element: <NoteList />,
                        path: 'folders/:folderId',
                        loader: notesLoader,
                        action: addNewNoteFunc,
                        children: [
                            {
                                element: <NoteDetail />,
                                path: `note/:noteId`,
                                loader: noteLoader,
                                action: updateNoteFunc,
                            }
                        ]
                    }
                ]
            },
            {
                path: "/login",
                element: <Login />,
            }
        ]
    }
]);

