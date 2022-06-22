// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react'

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)

import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import '../../src/index.scss';
import App from '../../src/App';
import {BrowserRouter} from 'react-router-dom';
import mainStore from '../../src/redux/main-store';
import {Provider} from 'react-redux';
// to override MUI Emotion style order
import {StyledEngineProvider} from '@mui/material/styles';


// render
const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);
root.render(
    <React.StrictMode>
    <BrowserRouter>
        <StyledEngineProvider injectFirst>
            <Provider store={mainStore}>
                <App/>
            </Provider>
        </StyledEngineProvider>
    </BrowserRouter>
</React.StrictMode>
);
