import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';

describe('Presentational > Loading', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <Loading />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
