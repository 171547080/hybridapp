import React from 'react';
import {View, Text, StyleSheet,Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import AppConfig from '../../config' 
interface IProps {
  name: String;
}
interface IState{
  text:string
}
class Community extends React.Component<IProps,IState> {
  constructor(props: IProps) {
    super(props);
    this.state={
      text:'text'
    }
    this.onHandelMessage = this.onHandelMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  onHandelMessage(event: any) {
    this.setState({
      text:event.nativeEvent.data
    })

  }
  sendMessage(data: any) {
    (this.refs.webview as WebView).postMessage(JSON.stringify(data));
  }
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
    const {text} = this.state
    const webUrl = AppConfig.webAppUrl
    return (
      <View style={styles.container}>
        <WebView
          ref='webview'
          //重写webview的postMessage方法，解决RN无法监听html自带的window.postMessage
          injectedJavaScript={`(function() {
            window.postMessage = function(data) {
              window.ReactNativeWebView.postMessage(data)
            }
            })();`}
          source={{uri: webUrl}}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          onMessage={(event) => {
            this.onHandelMessage(event)
          }}
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
    height: '80%',
  },
});
export default Community;
