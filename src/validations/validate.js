import validation from 'validate.js';
import validationRules from './validationRules';

export default function validate(fieldName, value, options) {
  
    const formValues = {}
    formValues[fieldName] = value;

    const formFields = {}
    formFields[fieldName] = validationRules[fieldName];

    if(options){
        formValues[options.key] = options.value;
    }

    const result = validation(formValues, formFields);

    if (result) {
        console.log(result);
    	return result[fieldName][0]
    }

    return null
}