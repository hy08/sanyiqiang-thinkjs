import Taro, { Component, Config } from '@tarojs/taro';

import { View, Text } from '@tarojs/components';
// import {  AtIcon } from 'taro-ui';
import TabBar from '@/components/tabBar/index';
import { TabType } from '@/util/enum';
import './index.less';

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: '首页'
  };

  handle;
  render() {
    return (
      <View className="page_index_container">
        <Text>首页</Text>
        <TabBar current={TabType.Home} />
      </View>
    );
  }
}
