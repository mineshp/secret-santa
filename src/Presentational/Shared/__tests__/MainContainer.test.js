import React from 'react';
import { shallow } from 'enzyme';
import MainContainer from '../MainContainer';

describe('Presentational > MainContainer', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <MainContainer />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
