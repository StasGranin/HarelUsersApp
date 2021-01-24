"use strict";

import React, {useState, useEffect} from 'react';

import ValidationService from '../../services/validation.service';
import {texts} from '../../services/language.service';

import './dynamicForm.component.scss';


export default ({formFields, values, onSubmit, onCancel, submitLabel = texts.buttonLabels.SUBMIT, cancelLabel = texts.buttonLabels.CANCEL}) => {

	const [fieldValues, setFieldValues] = useState({});
	const [validationErrors, setValidationErrors] = useState({});

	const handleFieldChange = (event) => {
		const {name: key, value} = event.target;

		delete validationErrors[key];

		setFieldValues({...fieldValues, [key]: value});
		setValidationErrors({...validationErrors});
	};

	const handleSubmit = (event) => { // All this should be in a dedicated service!
		event.preventDefault();

		ValidationService.validateForm(formFields, fieldValues, (isValid, errorMessages) => {
			if (isValid) {
				onSubmit(fieldValues);
			}
			else {
				setValidationErrors({...errorMessages});
			}
		});
	};

	useEffect(()=> {
		setFieldValues({...values});
	}, [values]);

	return (
		<form className="dynamicForm" onSubmit={handleSubmit}>
			<div className="innerPanel">
				{formFields.map(field => <div className="formField" key={field.key}>
					<label htmlFor={field.key}>{field.label}</label>
					<input name={field.key} type={field.type} value={fieldValues[field.key] || ''} onChange={handleFieldChange} />
					<div className="validationErrorMessage">{validationErrors[field.key]}</div>
				</div>)}
			</div>
			<div className="actions">
				{onCancel && <input className="button" type="button" onClick={onCancel} value={cancelLabel} />}
				<input className="button primary" type="submit" value={submitLabel} />
			</div>
		</form>
	);
};
