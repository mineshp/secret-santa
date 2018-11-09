import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Login';

describe('Login component', () => {
    it('renders correctly with valid data', () => {
        const handleChange = jest.fn();
        const handleSubmit = jest.fn();

        const data = {
            username: '',
            password: ''
        };

        const LoginComponent = shallow(
            <Login
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                data={data}
            />
        );

        expect(LoginComponent).toMatchSnapshot();
    });
});
