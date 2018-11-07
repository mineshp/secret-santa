import React from 'react';
import { shallow } from 'enzyme';
import MainNav from '../MainNav';

describe('Presentational > Home', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <MainNav />
    );
  });
  it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('sets activeName on handleClick', () => {
    wrapper.instance().handleItemClick({}, { name: 'test' });
    expect(wrapper.state().activeItem).toEqual('test');
  });
});
