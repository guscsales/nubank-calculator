import React from 'react';
import { shallow } from 'enzyme';
import { PureCalculator } from '.';

const classes = {
	wrapperCalculator: 'wrapperCalculator',
	resultBoxWrapper: 'resultBoxWrapper',
	calculatorButton: 'calculatorButton'
};

const restProps = {
	classes
};

describe('<Calculator />', () => {
	describe('#handleChangeMonths', () => {
		it('should increment amount on state', () => {
			const wrapper = shallow(<PureCalculator {...restProps} />);

			wrapper.instance().handleChangeMonths({ value: 60 });

			expect(wrapper.state().months).toBe(60);
		});
	});

	describe('#handleClickButtonValue', () => {
		it('should increment amount on state', () => {
			const wrapper = shallow(<PureCalculator {...restProps} />);

			wrapper.instance().handleClickButtonValue({ increment: true });

			expect(wrapper.state().amount).toBe(1100);
		});

		it('should decrement amount on state', () => {
			const wrapper = shallow(<PureCalculator {...restProps} />);

			wrapper.instance().handleClickButtonValue({ increment: false });

			expect(wrapper.state().amount).toBe(900);
		});

		it('should return nothing when new amount is less then zero', () => {
			const wrapper = shallow(<PureCalculator {...restProps} />);

			wrapper.setState({ amount: 0 });

			const result = wrapper
				.instance()
				.handleClickButtonValue({ increment: false });

			expect(result).toBeUndefined();
		});
	});

	describe('#handleChangeInputValue', () => {
		it('should set amount on state', () => {
			const wrapper = shallow(<PureCalculator {...restProps} />);

			wrapper.instance().handleChangeInputValue(null, null, 1001);

			expect(wrapper.state().amount).toBe(1001);
		});
	});

	describe('#render', () => {
		it('should render two `divs` with correct class name', () => {
			const wrapper = shallow(<PureCalculator {...restProps} />);

			expect(wrapper.find(`.${classes.wrapperCalculator}`)).toHaveLength(
				1
			);
			expect(wrapper.find(`.${classes.resultBoxWrapper}`)).toHaveLength(
				1
			);
		});

		it('should render amount zero on input when amount is less than zero', () => {
			const wrapper = shallow(<PureCalculator {...restProps} />);

			wrapper.setState({ amount: -50 });

			expect(wrapper.find('CurrencyInput').props().value).toBe(0);
		});
	});

	describe('listeners', () => {
		it('should call `handleClickButtonValue` with increment as true when press increment button', () => {
			const wrapper = shallow(<PureCalculator {...restProps} />);
			const instance = wrapper.instance();
			const spy = jest.spyOn(instance, 'handleClickButtonValue');

			wrapper
				.find(`.${classes.calculatorButton}`)
				.first()
				.simulate('click');

			expect(spy).toHaveBeenCalledWith({ increment: true });
		});

		it('should call `handleClickButtonValue` with increment as false when press decrement button', () => {
			const wrapper = shallow(<PureCalculator {...restProps} />);
			const instance = wrapper.instance();
			const spy = jest.spyOn(instance, 'handleClickButtonValue');

			wrapper
				.find(`.${classes.calculatorButton}`)
				.last()
				.simulate('click');

			expect(spy).toHaveBeenCalledWith({ increment: false });
		});
	});
});
