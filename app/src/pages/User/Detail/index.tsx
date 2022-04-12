import React from 'react';
import {View, Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../router';

interface IProps {
  route: RouteProp<RootStackParamList, 'UserDetail'>;
}

// router关键字，使用会报错
class UserDetail extends React.Component<IProps> {
  render() {
    const {route} = this.props;
    return (
      <View>
        <Text>Hello UserDetail !!! </Text>
        <Text>用户ID：{route.params.id}</Text>
      </View>
    );
  }
}
export default UserDetail;
