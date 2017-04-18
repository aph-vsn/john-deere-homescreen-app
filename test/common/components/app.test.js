import React from 'react';
import { shallow } from 'enzyme';

import App from '../../../src/components/core/app';

test('render with container div', () => {
  const wrapper = shallow(React.createElement(App));
  expect(wrapper.find('#container').length).toEqual(1);
});
