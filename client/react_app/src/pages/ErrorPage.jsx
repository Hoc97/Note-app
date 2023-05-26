import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <>
            <h1>Oops!</h1>
            <p style={{ marginTop: '5px' }}>Sorry, an unexpected error has occurred</p>
            <p style={{ marginTop: '10px' }}>
                <i>{error.statusText} {error.message}</i>
            </p>
        </>
    );
};

export default ErrorPage;