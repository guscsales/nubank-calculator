import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

const mobileStyle = {
	container: {
		width: '100%',
		padding: '0 15px',
		boxSizing: 'border-box'
	}
};

const desktopStyle = {
	'@media (min-width: 1024px)': {
		container: {
			maxWidth: 1328,
			margin: '0 auto'
		}
	}
};

const style = {
	...mobileStyle,
	...desktopStyle
};

class Container extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node,
		classes: PropTypes.object
	};

	render() {
		const { classes, children } = this.props;

		return <section className={classes.container}>{children}</section>;
	}
}

export { Container as PureContainer };

export default withStyles(style)(Container);
