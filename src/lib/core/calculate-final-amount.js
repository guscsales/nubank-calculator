export const validateValues = (amount, months, interest) => {
	let violations = [];

	if (amount < 0) {
		amount = 0;

		violations.push('invalid-initial-ammount');
	}
	if (months < 0) {
		violations.push('invalid-period');
	}

	if (interest < 0) {
		interest = 0;

		violations.push('invalid-interest');
	}

	return { amount, months, interest, violations };
};

export default (amount, months, interest) => {
	const validation = validateValues(amount, months, interest);

	amount = validation.amount;
	months = validation.months;
	interest = validation.interest;

	let gross = amount;

	for (let i = 0; i < months; i++) {
		const percerntOfAllMonths = (months * interest) / 100;
		const totalReceived = (gross * percerntOfAllMonths) / months;

		gross += totalReceived;
	}

	let tax = 0.15;

	if (months <= 6) {
		tax = 0.225;
	} else if (months <= 12) {
		tax = 0.2;
	} else if (months <= 18) {
		tax = 0.175;
	}
	const discount = (gross - amount) * tax;
	const liquid = gross - discount;

	const result = {
		gross: gross.toFixed(2),
		liquid: liquid.toFixed(2),
		tax: discount.toFixed(2),
		violations: validation.violations
	};

	console.log('Result of input:', result);

	return result;
};
