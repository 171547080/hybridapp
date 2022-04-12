import React from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '../../router';
import {RootState} from '../../models/indes';

// 连接redux 与 state的值指对
const mapStateToProps = ({home,loading}: RootState) => ({
  num: home.num,
  username: home.username,
  loading:loading.loading
});
// 连接redux
const connector = connect(mapStateToProps);

//  获取IProps 中能获取dispatch
type MadelState = ConnectedProps<typeof connector>;

// 定义props与store的属性指对
interface IProps extends MadelState {
  navigation: RootStackNavigation;
  num: number;
  username: string;
}

// 组件内部的state
interface IState {
  inputValue: string;
}

class Home extends React.Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {
      inputValue: '--',
    };
  }

  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate('User');
  };
  onPressDetail = () => {
    const {navigation} = this.props;
    navigation.navigate('UserDetail', {id: 1000});
  };
  handleChangeUsername = (val: string) => {
    this.setState({
      inputValue: val,
    });
  };
  onPressChangeUsername = () => {
    const {dispatch} = this.props;
    const {inputValue} = this.state;
    dispatch({
      type: 'home/asyncLogin',
      payload: {username: inputValue},
    });
  };
  render() {
    const {username,loading} = this.props;
    const {inputValue} = this.state;
    return (
      <View style={styles.container}>
        <Text>Hello Home !!! </Text>
        <Button title="跳转到用户页面" onPress={this.onPress}></Button>
        <Text>User 1000 </Text>
        <Button title="跳转到个人信息" onPress={this.onPressDetail}></Button>
        <Text>{ loading ?'加载中，请稍后。。。' : 'store.username : ' + username} </Text>
        <Text>{'inputValue : ' + inputValue} </Text>
        <TextInput
          value={inputValue}
          onChangeText={this.handleChangeUsername}></TextInput>
        <Button
          title="修改用户名"
          onPress={this.onPressChangeUsername}></Button>
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
export default connector(Home);
