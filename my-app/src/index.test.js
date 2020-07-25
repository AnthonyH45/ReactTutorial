import React, { Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';

import { Board, Game } from './index';

describe('tic-tac-toe', function() {
    // this line is only valid in type script
    // let container: HTMLDivElement | null = null;
    // type annotations are not a thing in javascript
    // type annotations are to enforce type checking, instead we cast
    var container = /** @type {HTMLDivElement} */ (document.createElement(null));
   
    test('test',
        () => {
            container = mount(<Game/>);
            console.log(container.debug());
            expect(1).toBe(1);
        }
    );

    /*
    beforeEach(
        () => {
            container = document.createElement('div');
            document.body.appendChild(container);

            jest.resetModules();
        }
    );
    */

    /*
    afterEach(
        () => {
            if (container) {
                unmountComponentAtNode(container);
                container.remove();
            }
            container = null;
            jest.restoreAllMocks();
        }
    );
    */


    /*
    it('should render',
        () => {
            ReactTestUtils.act(
                () => {
                    render(
                        <Game></Game>,
                        container
                    );
                }
            );
        }
    );
    */
});