import Taro, { Config, Component } from '@tarojs/taro';
import '@tarojs/async-await';
import { Provider } from '@tarojs/redux';
import Index from './pages/index/index';

import dva from './dva';
import models from './models/index';

import 'taro-ui/dist/style/index.scss'; // 全局引入一次即可
import './assets/iconFont/iconfont.css';
import './app.less';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5') {
//   require('nerv-devtools');
// }

const dvaApp = dva.createApp({
  initialState: {},
  models
});
const store = dvaApp.getStore();

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: ['pages/index/index', 'pages/money/index', 'pages/detail/index', 'pages/company/index', 'pages/message/index'],
    debug: process.env.NODE_ENV !== 'production' ? true : false,
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
    // tabBar: {
    //   color: '#7A7E83',
    //   selectedColor: '#c73420',
    //   borderStyle: 'black',
    //   backgroundColor: '#ffffff',
    //   list: [
    //     {
    //       text: '首页',
    //       pagePath: 'pages/index/index',
    //       iconPath: 'assets/img/home.png',
    //       selectedIconPath: 'assets/img/home-select.png'
    //     },
    //     {
    //       text: '产品',
    //       pagePath: 'pages/money/index?type=1',
    //       iconPath: 'assets/img/product.png',
    //       selectedIconPath: 'assets/img/product-select.png'
    //     }
    //   ]
    // }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
