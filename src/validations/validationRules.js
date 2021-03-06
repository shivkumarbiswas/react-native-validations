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
	
	if(value && !validator.isNumeric(value) && !validator.isLength(value, {min:12, max:12})){
		return validation.format("^%{field} has invalid value %{fieldValue}", {
			field: key,
			fieldValue: value
		});
	}	

	return null;
};

const validationRules = {
	firstName: {
			presence: {
				allowEmpty: false,
				message: '^First Name should not be blank'
			},
			format: {
				pattern: /^[A-Za-z\s]+$/,
				message: function(value, attribute, validatorOptions, attributes, globalOptions) {
							return validation.format("^%{field} has invalid value %{fieldValue}", {
								field: attribute,
								fieldValue: value
							});
						}
			}
	},
	lastName: {
		presence: {
			allowEmpty: false,
			message: "^Last Name should not be blank"
		},
		format: {
			pattern: /^[A-Za-z\s]+$/,
			message: function(value, attribute, validatorOptions, attributes, globalOptions) {
						return validation.format("^%{field} has invalid value %{fieldValue}", {
							field: attribute,
							fieldValue: value
						});
					}
		}
	},
	email: {
	    presence: {
			allowEmpty: false,
			message: '^Email cannot be blank'
		},
	    format: {
	        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	        message: '^Invalid email id',
	    }
	},
	password: {
	    presence: {
			allowEmpty: false,
			message: '^Password cannot be empty'
		},
	    length: {
	        minimum: 4,
	        message: '^Invalid Password',
	    }
	},
	confirmPassword: {
	    presence: {
			allowEmpty: false,
			message: '^Confirm Password cannot be empty'
		},
	    equality: 'password'
	},
	dob: {
		presence: {
			allowEmpty: false,
			message: '^Date should not be empty'
		},
		datetime: {
		  dateOnly: true,
		  latest: moment.utc().subtract(18, 'years'),
		  message: "^You need to be atleast 18 years old"
		}
	},
	doj: {
		presence: {
			allowEmpty: false,
			message: '^Date should not be empty'
		},
		datetime: {
		  dateOnly: true,
		  latest: moment.utc(),
		  message: "^Joining date should be less than or equal to today's date"
		}
	},
	contactNumber: {
		presence: {
			allowEmpty: false,
			message: '^Contact Number should not be blank'
		},
		isMobilePhone: true
	},
	aadharNumber: {
		presence: {
			allowEmpty: false,
			message: '^Aadhar Number should not be blank'
		},
		isAadharNumber: true
	},
};

export default validationRules;