import React from 'react';
import { shallow } from 'enzyme';
import { PureRow } from '.';

const classes = {
	row: 'test'
};

const restProps = {
	classes
};

describe('<Row />', () => {
	it('should render a `div` with correct class name', () => {
		const wrapper = shallow(<PureRow {...restProps} />);

		expect(wrapper.find(`.${classes.row}`)).toHaveLength(1);
	});
});
