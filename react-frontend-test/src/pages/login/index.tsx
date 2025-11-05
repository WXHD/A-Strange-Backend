import { useNavigate } from '@tanstack/react-router';
import { Button, Form, Input } from 'antd';

import type { UserItem } from '@type/user';
import { userService } from '@service/user-service';
import './index.less';

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    userService.authenticate(values).then((user: UserItem | null) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.globalMessage.success(`欢迎您，stranger ${user.username} ~`);
        navigate({ to: '/square' });
      }
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">欢迎回来</h1>
          <p className="auth-subtitle">请登录您的账户</p>
        </div>

        <Form
          name="login"
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="auth-button login-button"
              size="large"
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-footer">
          <span>还没有账户？</span>
          <Button
            type="link"
            className="auth-link"
            onClick={() => navigate({ to: '/register' })}
          >
            立即注册
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;