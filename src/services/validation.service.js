'use strict';

export const validationTypes = {NOT_EMPTY: 'NOT_EMPTY', PATTERN: 'PATTERN', DATE: 'DATE'};
export const fieldTypes = {TEXT: 'text', DATE: 'date', PASSWORD: 'password'};

class ValidationService {
	validateForm(formFields, fieldValues, callback) {
		let isFormValid = true;
		let validationErrors = {};

		formFields.forEach(field => {
			const {key, validation: validations} = field;
			const value = fieldValues[key] || '';

			validations.some(validation => {
				let isValid = true;

				switch (validation.type) {
					case validationTypes.NOT_EMPTY:
						isValid = value.trim() && true;
						break;

					case validationTypes.PATTERN:
						isValid = validation.pattern.test(value);
						break;
				}

				if (!isValid) {
					isFormValid = false;
					validationErrors[key] = validation.errorMessage;
					return true;
				}
			});
		});

		callback(isFormValid, validationErrors);
	}
}

export default new ValidationService();
