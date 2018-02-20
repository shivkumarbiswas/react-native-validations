import validation from 'validate.js';
import validationRules from './common.validationRules';
import studentValidationRules from './student.validationRules';

const student = studentValidationRules.student;

export default function validate(fieldName, value, options) {
  
    let items = fieldName.split('.');
    const formValues = {};
    const formFields = {};

    if(items.length > 1) {     
        
        if(items[0] === 'student') {
            fieldName = items[1];
            formValues[items[1]] = value;
            formFields[items[1]] = student[items[1]];           
       }
    }
    else {
        formValues[fieldName] = value;
        formFields[fieldName] = validationRules[fieldName];
    }

    if(options) {
        formValues[options.key] = options.value;
    }

    const result = validation(formValues, formFields);

    if (result) {
        console.log(result);
    	return result[fieldName][0]
    }

    return null
}