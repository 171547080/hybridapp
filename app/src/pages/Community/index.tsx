import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {RootStackNavigation} from '../../router';

interface IProps {
  navigation: RootStackNavigation;
}

class Community extends React.Component<IProps> {
  render() {
    // WebView
    // source
    // 在WebView中指定加载内容html或者url,可以指定header,method等
    
    // startInLoadingState
    // 强制WebView在第一次加载时先显示loading视图。默认为true

    // domStorageEnabled（android）
    // 布尔值,指定是否开启DOM本地存储

    // javaScriptEnabled（android）
    // 布尔值,指定WebView中是否启用JavaScript。只在Android上使用，因为在iOS上默认启用了JavaScript。

    return (
      <View style={styles.container}>
        <WebView
          source={{uri: 'http://192.168.19.191:8080'}}
          domStorageEnabled={true}
          javaScriptEnabled={true}
        />
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
export default Community;
