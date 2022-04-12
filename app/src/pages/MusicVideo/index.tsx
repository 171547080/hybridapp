import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { RootStackNavigation } from '../../router';

interface IProps{
  navigation: RootStackNavigation
}

class MusicVideo extends React.Component<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello MusicVideo !!! </Text>
      </View>
    );
  }
}
// 变量提升
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
export default MusicVideo;
