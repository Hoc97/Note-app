import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/system';

import './firebase/config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Container maxWidth='lg' sx={{ textAlign: 'center', marginTop: '50px' }}>
    <RouterProvider router={router} />
  </Container>
);
