import { useNavigate } from '@tanstack/react-router';
import { Button, Form, Input } from 'antd';

import { userService } from '@service/user-service';
import './index.less';

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    userService.addUser(values).then(() => {
      window.globalMessage.success(`创建账户成功，请登录 ~`);
      navigate({ to: '/login' });
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">创建账户</h1>
          <p className="auth-subtitle">填写信息开始使用</p>
        </div>
        
        <Form
          name="register"
          onFinish={onFinish}
          className="auth-form"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input 
              placeholder="用户名" 
              className="auth-input"
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="pwd"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password 
              placeholder="密码" 
              className="auth-input"
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="confirm"
            dependencies={['pwd']}
            rules={[
              { required: true, message: '请确认密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('pwd') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password 
              placeholder="确认密码" 
              className="auth-input"
              size="large"
            />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="auth-button register-button"
              size="large"
            >
              注册
            </Button>
          </Form.Item>
        </Form>
        
        <div className="auth-footer">
          <span>已有账户？</span>
          <Button 
            type="link" 
            className="auth-link"
            onClick={() => navigate({ to: '/login' })}
          >
            立即登录
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;