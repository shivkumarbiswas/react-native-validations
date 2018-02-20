
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  DatePickerAndroid
} from 'react-native';
import validate from '../validations/validate';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';


export default class RegistrationForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      firstNameErrorMessage: '',
      lastName: '',
      lastNameErrorMessage: '',
      dob: new Date(),
      DateText:'Date Of Birth',
      dobErrorMessage:'',
      doj: new Date(),
      DateofJoiningText: 'Date of Joining',
      dojErrorMessage:'',
      contactNumber:'',
      contactNumberErrorMessage:'',
      email:'',
      emailErrorMessage:'',
      aadharNumber:'',
      aadharNumberErrorMessage:'',
      email:'',
      emailErrorMessage:'',
      password:'',
      passwordErrorMessage:'',
      confirmPassword:'',
      confirmPasswordErrorMessage:'',
      student: {
        firstName: "",
        firstNameErrorMessage: "",
      }
    }

    this.onDatePickedFunction = this.onDatePickedFunction.bind(this);
    this.onDateofJoiningPickedFunction = this.onDateofJoiningPickedFunction.bind(this);
  }

  validate(fieldName, fieldValue) {

    var errorMessage = validate(fieldName, fieldValue);

    if(fieldName === 'firstName')
      this.setState({firstNameErrorMessage: errorMessage});
    else if(fieldName === 'student.firstName')
      this.setState({student: {firstNameErrorMessage: errorMessage}});
  }

  /**
   * Textbox click listener
   */
  DatePickerMainFunctionCall() {

    this.refs.DatePickerDialog.open({
      date: this.state.dob,
    });    
  }

  DateofJoiningPickerMainFunctionCall() {
    this.refs.DateofJoiningPickerDialog.open({
      date: this.state.doj,
    });    
  }
 
  onDatePickedFunction(date) {

    console.log(date);
    this.setState({dobErrorMessage: validate('dob', moment(date).format('YYYY-MM-DD'))});

    this.setState({
      dob: date,
      DateText: moment(date).format('DD-MMM-YYYY')
    });
  }

  onDateofJoiningPickedFunction(date) {

    this.setState({dojErrorMessage: validate('doj', moment(date).format('YYYY-MM-DD'))});

    this.setState({
      doj: date,
      DateofJoiningText: moment(date).format('DD-MMM-YYYY')
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <View>
          <Text>Registration:</Text>
        </View>
        <View>
          <TextInput style={styles.input} placeholder="First Name" onChangeText={value => this.setState({firstName: value})}
                     onBlur={()=>this.validate('firstName', this.state.firstName)}
          />
          <Text style={styles.error}>{this.state.firstNameErrorMessage}</Text>
        </View>
        <View>
          <TextInput style={styles.input} placeholder="Student First Name" onChangeText={value => this.setState({student: {firstName: value}})}
                     onBlur={()=>this.validate('student.firstName', this.state.student.firstName)}
          />
          <Text style={styles.error}>{this.state.student.firstNameErrorMessage}</Text>
        </View>
        <View>
          <TextInput style={styles.input} placeholder="Last Name" onChangeText={value => this.setState({firstName: value})}
                     onBlur={() => {
                                      this.setState({lastNameErrorMessage: validate('lastName', this.state.firstName)})
                                   }
                            }/>
          <Text style={styles.error}>{this.state.lastNameErrorMessage}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >
            <View style={styles.datePickerBox}>
              <Text style={styles.datePickerText}>{this.state.DateText}</Text>
            </View>
          </TouchableOpacity>
          <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction} />
          <Text style={styles.error}>{this.state.dobErrorMessage}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.DateofJoiningPickerMainFunctionCall.bind(this)} >
            <View style={styles.datePickerBox}>
              <Text style={styles.datePickerText}>{this.state.DateofJoiningText}</Text>
            </View>
          </TouchableOpacity>
          <DatePickerDialog ref="DateofJoiningPickerDialog" onDatePicked={this.onDateofJoiningPickedFunction} />
          <Text style={styles.error}>{this.state.dojErrorMessage}</Text>
        </View>
        <View>
          <TextInput style={styles.input} placeholder="Contact Number" onChangeText={value => this.setState({contactNumber: value})}
                     onBlur={() => {
                                      this.setState({contactNumberErrorMessage: validate('contactNumber', this.state.contactNumber)})
                                   }
                            }/>
          <Text style={styles.error}>{this.state.contactNumberErrorMessage}</Text>
        </View>
        <View>
          <TextInput style={styles.input} placeholder="Aadhar Number" onChangeText={value => this.setState({aadharNumber: value})}
                     onBlur={() => {
                                      this.setState({aadharNumberErrorMessage: validate('aadharNumber', this.state.aadharNumber)})
                                   }
                            }/>
          <Text style={styles.error}>{this.state.aadharNumberErrorMessage}</Text>
        </View>
        <View>
          <TextInput style={styles.input} placeholder="Email" onChangeText={value => this.setState({email: value})}
                     onBlur={() => {
                                      this.setState({emailErrorMessage: validate('email', this.state.email)})
                                   }
                            }/>
          <Text style={styles.error}>{this.state.emailErrorMessage}</Text>
        </View>
        <View>
          <TextInput style={styles.input} placeholder="Password" onChangeText={value => this.setState({password: value})}
                     onBlur={() => {
                                      this.setState({passwordErrorMessage: validate('password', this.state.password)})
                                   }
                            }/>
          <Text style={styles.error}>{this.state.passwordErrorMessage}</Text>
        </View>
        <View>
          <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={value => this.setState({confirmPassword: value})}
                     onBlur={() => {
                                      this.setState({confirmPasswordErrorMessage: validate('confirmPassword', this.state.confirmPassword, {key: 'password', value: this.state.password})})
                                   }
                            }/>
          <Text style={styles.error}>{this.state.confirmPasswordErrorMessage}</Text>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 23
  },
  input: {
      margin: 15,
      height: 40,
  },
  error: {
    marginLeft: 15,
    color: 'red'
  },
  datePickerBox:{
    margin: 15,
    borderColor: '#FF5722',
    borderWidth: 0.5,
    padding: 15,
    height: 38,
    justifyContent:'center'
  },
 
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#000',
  },
});
