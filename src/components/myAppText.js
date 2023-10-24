import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

BASE_FONT = 'DMSans-Regular'

export class AppText extends Component {
  render() {
    return (
      <Text {...this.props} style={style}></Text>
    );
  }
}
const styles= StyleSheet.create({
  myAppText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
  }
})