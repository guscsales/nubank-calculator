import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import classnames from 'classnames';

const defaultColStyle = {
	boxSizing: 'border-box',
	padding: '0 15px'
};

const defaultDesktopColStyle = {
	...defaultColStyle,
	padding: '0 25px'
};

const mobileStyle = {
	col: {},
	col6: {
		flex: '0 0 50%',
		...defaultColStyle
	},
	col12: {
		flex: '0 0 100%',
		...defaultColStyle
	},
	colMd6: {}
};

const desktopStyle = {
	'@media (min-width: 1024px)': {
		col: {
			flex: 'auto'
		},
		colMd6: {
			flex: '0 0 50%',
			...defaultDesktopColStyle
		}
	}
};

const style = {
	...mobileStyle,
	...desktopStyle
};

class Col extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node,
		classes: PropTypes.object,
		size: PropTypes.number,
		desktop: PropTypes.number,
		className: PropTypes.string
	};

	static defaultProps = {
		size: 12
	};

	render() {
		const { classes, children, size, desktop, className } = this.props;
		const cx = classnames(
			classes[`col${size}`],
			{
				[classes[`colMd${desktop}`]]: desktop && desktop > 0
			},
			className
		);

		return <div className={cx}>{children}</div>;
	}
}

export { Col as PureCol };

export default withStyles(style)(Col);
