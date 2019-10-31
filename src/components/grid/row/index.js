import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import classnames from 'classnames';

const style = {
	row: {
		display: 'flex',
		flexWrap: 'wrap',
		boxSizing: 'border-box',
		margin: '0 -15px'
	},
	'@media (min-width: 1024px)': {
		row: {
			margin: '0 -25px'
		}
	}
};

class Row extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node,
		classes: PropTypes.object,
		className: PropTypes.string
	};

	render() {
		const { classes, children, className } = this.props;

		return (
			<div className={classnames(classes.row, className)}>{children}</div>
		);
	}
}

export { Row as PureRow };

export default withStyles(style)(Row);
