import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

export default function BilliardExample() {
  return (
    <View style={styles.container}>
      <Text>react-native-box2d is not supported on web</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
