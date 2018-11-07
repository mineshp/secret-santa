import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../NotFound';

describe('Presentational > NotFound', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <NotFound />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
