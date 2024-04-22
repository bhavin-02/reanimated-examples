import React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  function handleOnPress() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function badWorklet() {
      'worklet';
      // @ts-expect-error
      unexistingVariable;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Clicking the button below should give a RedBox with stack trace that
        denotes the error in `badWorklet` function, pointing to
        `unexistingVariable` usage.
      </Text>
      <Button title="Crash me" onPress={handleOnPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
