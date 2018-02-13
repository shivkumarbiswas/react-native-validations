import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Title extends Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View>
                <Text>{this.props.text}</Text>
            </View>
        );
    }
}

Title.propTypes = {
    text: PropTypes.string.isRequired,
}

function textLength(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';
  
    if (props[propName]) {
      let value = props[propName];
      if (typeof value === 'string') {
          return value.length <= 8 ? null : new Error(propName + ' in ' + componentName + " is longer than 8 characters");
      }
    }
  
    return null;
  }