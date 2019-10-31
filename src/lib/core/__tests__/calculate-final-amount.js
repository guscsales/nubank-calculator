import calculateFinalAmount from '../calculate-final-amount';

describe('#calculateFinalAmount', () => {
	it('should return correct calculated values', () => {
		const result = calculateFinalAmount(1000, 12, 0.5);

		expect(result).toEqual({
			gross: '1061.68',
			liquid: '1049.34',
			tax: '12.34',
			violations: []
		});
	});

	it('should calculate correct tax for 6 months or less', () => {
		const result = calculateFinalAmount(1000, 6, 0.5);

		expect(result).toEqual({
			gross: '1030.38',
			liquid: '1023.54',
			tax: '6.83',
			violations: []
		});
	});

	it('should calculate correct tax for months between 7 and 12', () => {
		const result = calculateFinalAmount(1000, 7, 0.5);

		expect(result).toEqual({
			gross: '1035.53',
			liquid: '1028.42',
			tax: '7.11',
			violations: []
		});
	});

	it('should calculate correct tax for months between 13 and 18', () => {
		const result = calculateFinalAmount(1000, 18, 0.5);

		expect(result).toEqual({
			gross: '1093.93',
			liquid: '1077.49',
			tax: '16.44',
			violations: []
		});
	});

	it('should calculate correct tax for 19 months or more', () => {
		const result = calculateFinalAmount(1000, 60, 0.5);

		expect(result).toEqual({
			gross: '1348.85',
			liquid: '1296.52',
			tax: '52.33',
			violations: []
		});
	});

	it('should return all values as zero and a list of violations when values are wrong', () => {
		const result = calculateFinalAmount(-1, -1, -1);

		expect(result).toEqual({
			gross: '0.00',
			liquid: '0.00',
			tax: '0.00',
			violations: [
				'invalid-initial-ammount',
				'invalid-period',
				'invalid-interest'
			]
		});
	});
});
