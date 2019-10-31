export default {
	wrapperCalculator: {},
	purpleColor: {
		color: '#8a05be'
	},
	titleLabel: {
		margin: '25px 0 15px'
	},
	calculatorValue: {
		display: 'flex',
		alignItems: 'center'
	},
	calculatorInput: {
		backgroundColor: 'transparent',
		border: 'none',
		color: '#000',
		fontSize: 20,
		'&:focus': {
			border: 'none',
			boxShadow: 'none',
			outline: 'none'
		}
	},
	calculatorWrapperButtons: {
		display: 'flex',
		flexDirection: 'row-reverse'
	},
	calculatorButton: {
		border: '1px solid #8a05be',
		borderRadius: '100%',
		width: 56,
		height: 56,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		transition: '200ms all linear',
		'&:hover': {
			backgroundColor: 'rgba(138, 5, 190, 0.05)'
		},
		'&:last-child': {
			marginRight: 16
		}
	},
	wrapperSlider: {
		marginTop: 30
	},
	months: {
		margin: '10px 0'
	},
	'@media (min-width: 1024px)': {
		wrapperCalculator: {
			marginTop: 220
		}
	}
};
