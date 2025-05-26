import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Splash = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
        <Text
          style={{
            color: '#ff4500',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
          }}>
          Welcome Weather app !
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
