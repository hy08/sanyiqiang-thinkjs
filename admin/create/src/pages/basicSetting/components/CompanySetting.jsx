import { Button, Form, Input, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import { isEmpty } from 'lodash';
import styles from './BaseView.less';

const FormItem = Form.Item;


@connect(({ user }) => ({
  company: user.company,
}))
class CompanySetting extends Component {

  componentDidMount() {
    const { company, dispatch } = this.props;
    if (isEmpty(company)) {
      dispatch({
        type: 'user/getCompany',
        payload: {
          success: () => {
            this.setBaseInfo();
          }
        }
      })
    } else {
      this.setBaseInfo();
    }
  }

  setBaseInfo = () => {
    const { company, form } = this.props;

    if (!isEmpty(company)) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = company[key] || null;
        form.setFieldsValue(obj);
      });
    }
  };

  handlerSubmit = event => {
    event.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(err => {
      if (!err) {
        dispatch({
          type: 'user/putCompany',
          payload: {
            data: form.getFieldsValue(),
            success: () => {
              this.setBaseInfo();
              message.success('公司设置已保存');
            }
          }
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" hideRequiredMark>
            <FormItem label="公司名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入公司全称!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="公司地址">
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: '请输入公司详细地址',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="联系电话">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
                    message: '请输入正确的公司电话',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="微信号">
              {getFieldDecorator('wechat', {
                rules: [
                  {
                    required: true,
                    pattern: /^\w{1,}$/,
                    message: '请输入正确的微信号',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="qq">
              {getFieldDecorator('qq', {
                rules: [
                  {
                    required: true,
                    pattern: /^\d{5,20}$/,
                    message: '请输入正确的qq号(5-20个数字)',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: false,
                    pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                    message: '请输入正确的公司邮箱',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <Button type="primary" onClick={this.handlerSubmit}>保存</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(CompanySetting);
