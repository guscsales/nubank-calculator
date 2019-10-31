import React from 'react';
import PropTypes from 'prop-types';
import withStyle from 'react-jss';
import classnames from 'classnames';

import 'rc-slider/assets/index.css';
import '../../lib/styles/rc-slider.nubank.css';
import Slider from 'rc-slider';
import CurrencyInput from 'react-currency-input';

import Container from '../container';
import { Row, Col } from '../grid';

import calculateFinalAmount from '../../lib/core/calculate-final-amount';

import minusSvg from '../../lib/images/minus.svg';
import plusSvg from '../../lib/images/plus.svg';
import relaxingPng from '../../lib/images/relaxing.png';

import calculatorBoxStyle from './styles/calculator-box.style';
import resultBoxStyle from './styles/result-box.style';

/* TODO: COMMENT THE LINES BELOW AND UNCOMMENT THE NEXT ONE
		 TO USE WRONG VALUES AS INITIAL INPUT */
const {
	'initial-amount': initialAmount,
	interest,
	period
} = require('../../lib/fixtures/correct-input.json');
// const {
// 	'initial-amount': initialAmount,
// 	interest,
// 	period
// } = require('../../lib/fixtures/wrong-input.json');

const style = {
	...calculatorBoxStyle,
	...resultBoxStyle
};

class Calculator extends React.PureComponent {
	static propTypes = {
		classes: PropTypes.object
	};

	constructor() {
		super();

		const { gross, liquid } = calculateFinalAmount(
			initialAmount,
			period,
			interest
		);

		this.state = {
			amount: initialAmount,
			months: period,
			gross,
			liquid
		};

		this.handleChangeMonths = this.handleChangeMonths.bind(this);
		this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
	}

	handleChangeMonths(props) {
		const { value, dragging, ...restProps } = props;
		const { amount } = this.state;

		const { gross, liquid } = calculateFinalAmount(amount, value, interest);

		this.setState({
			months: value,
			gross,
			liquid
		});

		return <Slider.Handle value={value} {...restProps} />;
	}

	handleClickButtonValue({ increment }) {
		const { amount } = this.state;
		const newAmount = increment ? amount + 100 : amount - 100;

		if (newAmount < 0) {
			return;
		}

		this.setState({ amount: newAmount });
	}

	handleChangeInputValue(e, maskedAmount, amount) {
		this.setState({ amount });
	}

	renderBoxCalculator() {
		const { classes } = this.props;
		const { amount, months } = this.state;

		return (
			<div className={classes.wrapperCalculator}>
				<Row>
					<Col className={classes.titleLabel}>First deposit</Col>
				</Row>
				<Row className={classes.calculator}>
					<Col size={6} className={classes.calculatorValue}>
						<CurrencyInput
							value={amount < 0 ? 0 : amount}
							onChangeEvent={this.handleChangeInputValue}
							decimalSeparator=","
							thousandSeparator="."
							prefix="R$ "
							className={classes.calculatorInput}
							precision="0"
						/>
					</Col>
					<Col size={6} className={classes.calculatorWrapperButtons}>
						<div
							className={classes.calculatorButton}
							onClick={
								/* istanbul ignore next */ () =>
									this.handleClickButtonValue({
										increment: true
									})
							}
						>
							<img src={plusSvg} alt="INCREMENTAR" />
						</div>
						<div
							className={classes.calculatorButton}
							onClick={
								/* istanbul ignore next */ () =>
									this.handleClickButtonValue({
										increment: false
									})
							}
						>
							<img src={minusSvg} alt="DECREMENTAR" />
						</div>
					</Col>
				</Row>
				<Row>
					<Col className={classes.wrapperSlider}>
						<div>For</div>
						<div
							className={classnames(
								classes.purpleColor,
								classes.months
							)}
						>
							{months} months
						</div>
						<Slider
							min={12}
							max={60}
							defaultValue={months}
							handle={this.handleChangeMonths}
						/>
					</Col>
				</Row>
			</div>
		);
	}

	renderBoxResult() {
		const { classes } = this.props;
		const { gross, liquid, months } = this.state;

		return (
			<div className={classes.resultBoxWrapper}>
				<img
					src={relaxingPng}
					className={classes.resultBoxImage}
					alt="Uma mulher de pernas cruzadas e um drink"
				/>
				<Row>
					<Col>after {months} months you would have</Col>
					<Col className={classes.resultBoxTotalValue}>
						R$ {liquid}
					</Col>
					<Col>(gross amount R$ {gross})</Col>
					<Col className={classes.resultBoxNote}>
						This estimate does not constitute a guarantee of future
						earnings. It is only and estimate based on today's
						Interbank Deposit rate for the entire period that your
						deposit would remain in your NuConta account, and
						considering no withdrawals.
					</Col>
				</Row>
			</div>
		);
	}

	render() {
		return (
			<Container>
				<Row>
					<Col desktop={6}>{this.renderBoxCalculator()}</Col>
					<Col desktop={6}>{this.renderBoxResult()}</Col>
				</Row>
			</Container>
		);
	}
}

export { Calculator as PureCalculator };

export default withStyle(style)(Calculator);
