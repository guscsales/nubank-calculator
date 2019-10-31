import React from 'react';
import { shallow } from 'enzyme';
import { PureContainer } from '.';

const classes = {
	container: 'test'
};

const restProps = {
	classes
};

describe('<Container />', () => {
	it('should render a `div` with correct class name', () => {
		const wrapper = shallow(<PureContainer {...restProps} />);

		expect(wrapper.find(`.${classes.container}`)).toHaveLength(1);
	});
});
