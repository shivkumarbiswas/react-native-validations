import validation from './custom.validationRules';
import moment from 'moment';
import validator from 'validator';

const studentValidationRules = { 
    student:
            {
                firstName: {
                        presence: {
                            allowEmpty: false,
                            message: '^Student First Name should not be blank'
                        },
                        format: {
                            pattern: /^[A-Za-z\s]+$/,
                            message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                                        return validation.format("^Student %{field} has invalid value %{fieldValue}", {
                                            field: attribute,
                                            fieldValue: value
                                        });
                                    }
                        },
                        minLength: {
                            message: '^Length is invalid',
                        },
                }
            }
    };
    
export default studentValidationRules;