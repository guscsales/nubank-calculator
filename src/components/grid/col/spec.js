import React from 'react';
import { shallow } from 'enzyme';
import { PureCol } from '.';

const classes = {
	col12: 'test',
	colMd6: 'test'
};

const restProps = {
	classes
};

describe('<Col />', () => {
	it('should render a `div` with correct class name', () => {
		const wrapper = shallow(<PureCol size={12} {...restProps} />);

		expect(wrapper.find(`.${classes[`col12`]}`)).toHaveLength(1);
	});

	it('should render a `div` with correct class name for desktop', () => {
		const wrapper = shallow(<PureCol desktop={6} {...restProps} />);

		expect(wrapper.find(`.${classes[`colMd6`]}`)).toHaveLength(1);
	});
});
