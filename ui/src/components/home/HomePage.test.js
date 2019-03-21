import React from 'react';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from './HomePage'
import RuleEngineHome from '../rule-engine/RuleEngineHome'
configure({adapter:new Adapter()})

describe('<HomePage/>',()=>{
it('should have 4 tabs',()=>{
  const wrapper = shallow(<HomePage/>);
  expect(wrapper.find(RuleEngineHome));
})
})