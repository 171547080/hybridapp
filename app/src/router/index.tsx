import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

// import BottomTabs from './BottomTabs';

import WebApp from '../pages/WebApp';
import Home from '../pages/Home';
import User from '../pages/User';
import Login from '../pages/Login';
import UserDetail from '../pages/User/Detail';

// 约束路由参数，当路由配置不存在的name 不存在时，提示异常
export type RootStackParamList = {
  BottomTabs: undefined;
  WebApp:undefined;
  Home:undefined;
  User: undefined;
  Login: undefined;
  UserDetail: {
    id: number;
  };
};

// 导出路由导航信息，通过RootStackNavigation获取可跳转的路由信息
export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Router = function () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WebApp"
        screenOptions={{
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          gestureEnabled: true,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 17,
            color: '#333333',
            fontFamily: 'PingFangSC-Semibold',
            fontWeight: '700',
          }
        }}>
        {/* <Stack.Screen name="BottomTabs" component={BottomTabs} /> */}
        
        <Stack.Screen
          name="WebApp"
          component={WebApp}
          options={{title: 'APP'}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: '首页'}}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{title: '个人中心'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: '登录'}}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={{title: '个人信息'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
