import { mount } from 'cypress/react18';

/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            loginUser(redirectTo: string): Chainable<void>;
            mount: typeof mount;
        }
    }
}

export { };
