import React from 'react';
import { connect } from "dva";
import Link from 'umi/link';
import { Icon } from 'antd';
import styles from './Footer.less';

@connect(({ model }) => ({
  company: model.company
}))
class Footer extends React.Component {
  static defaultProps = {}

  constructor(props) {
    super(props);
  };

  getTabTitle = (iconType, title) => {
    return (
      <div className={styles.tabTitle}>
        <Icon type={iconType} className={styles.tabIcon} />
        <span className={styles.tabTitleText}>{title}</span>
      </div>
    )
  }
  render() {
    const { phone, address } = this.props.company;
    return (
      <div className={styles.footer}>
        <div className={styles.content}>
          <div className={styles.footerNav}>
            <ul>
              <li>网站导航</li>
              <li>
                <Link to="/about/1">关于我们</Link>
              </li>
              <li>
                <Link to="/products">产品展示</Link>
              </li>
              <li>
                <Link to="/devices">设备展示</Link>
              </li>
              <li>
                <Link to="/linkus/1">联系我们</Link>
              </li>
              <li>
                <Link to="/linkus/2">敬请留言</Link>
              </li>
            </ul>
          </div>
          <div className={styles.products}>
            {this.getTabTitle('appstore', '产品中心')}
            <div className={styles.tabContent, styles.productsContent}>
              <Link to="/products">印刷制品</Link>
              <Link to="/devices">生产设备</Link><br />
              <Link to="/products">案例展示</Link>
            </div>
          </div>
          <div className={styles.about}>
            {this.getTabTitle('idcard', '关于公司')}
            <p className={styles.tabContent, styles.intro}>公司拥有一批专业的印刷技术人才，专业检测仪器及全自动化的印刷设备，从产品设计、到投入生产，每个环节都严格品质把关。</p>
          </div>
          <div className={styles.linkus}>
            {this.getTabTitle('phone', '联系我们')}
            <ul className={styles.tabContent, styles.linkusContent}>
              <li>咨询热线：<span className={styles.phone}>{phone}</span></li>
              <li>工作时间：周一至周五9:00-18:00</li>
              <li>公司地址：{address}</li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          版权所有：昆山三艺强印刷有限公司 © 2020　　苏ICP备20005550号-1
        </div>
      </div>
    );
  };
};

export default Footer;