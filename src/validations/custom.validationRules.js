import validation from 'validate.js';
import moment from 'moment';
import validator from 'validator';

validation.extend(validation.validators.datetime, {
	parse: function(value, options) {
	  return +moment.utc(value);
	},
	format: function(value, options) {
	  var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
	  return moment.utc(value).format(format);
	}
});

validation.validators.isMobilePhone = function(value, options, key, attributes, globalOptions) {
	
	if(value && !validator.isMobilePhone(value, 'en-IN')){
		return validation.format("^%{field} has invalid value %{fieldValue}", {
			field: key,
			fieldValue: value
		});
	}	

	return null;
};

validation.validators.isAadharNumber = function(value, options, key, attributes, globalOptions) {
	
	if(value && (!validator.isNumeric(value) || !validator.isLength(value, {min:12, max:12}))){
		return validation.format("^%{field} has invalid value %{fieldValue}", {
			field: key,
			fieldValue: value
		});
	}	

	return null;
};

validation.validators.minLength = function(value, options, key, attributes, globalOptions) {
	if(value && !validator.isLength(value, {min:3, max:12})){
		return options.message;
	}	

	return null;
};

export default validation;