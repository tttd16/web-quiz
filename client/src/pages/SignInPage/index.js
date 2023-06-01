import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Typography, Divider, message } from 'antd';
import {
  GoogleOutlined,
  FacebookFilled,
  GithubOutlined,
  MailOutlined,
  LockOutlined,
  RollbackOutlined,
} from '@ant-design/icons';

import './style.css';
import { login } from '../../redux/actions';
import { selectAccessToken } from '../../redux/selectors';

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  const loginSocial = () => {
    message.success('Login Success!');
  };

  const handleSubmit = (val) => {
    dispatch(login(val));
  };

  useEffect(() => {
    if (accessToken) navigate('/');
  }, [accessToken, navigate]);

  return (
    <div id="singin-page">
      <div className="back-home">
        <Link to="/">
          <RollbackOutlined className="back-home__icon" />
        </Link>
      </div>
      <Form
        name="basic"
        style={{
          maxWidth: 600,
        }}
        onFinish={handleSubmit}
        size={'large'}
        className="loginForm"
        layout="vertical"
      >
        <Typography.Title style={{ textAlign: 'center', fontWeight: 700 }} level={1}>
          Login to your Account
        </Typography.Title>

        <Form.Item
          className="form-item"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter valid email',
            },
          ]}
          label={
            <span>
              <MailOutlined style={{ marginRight: 8 }} />
              Email
            </span>
          }
          name="email"
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          className="form-item"
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
          label={
            <span>
              <LockOutlined style={{ marginRight: 8 }} />
              Password
            </span>
          }
          name="password"
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Button style={{ marginTop: 16 }} type="primary" htmlType="submit" block>
          Login
        </Button>
        <Typography.Text style={{ fontSize: 20 }}>Not a member?</Typography.Text>

        <Typography.Text style={{ fontSize: 20, color: '#1677ff', cursor: 'pointer' }}>
          <Link to="/signup">Register</Link>
        </Typography.Text>
        <Divider style={{ borderColor: 'black' }}>or Login with</Divider>
        <div className="socialLogin">
          <GoogleOutlined className="socialIcon" onClick={loginSocial} />
          <FacebookFilled className="socialIcon" onClick={loginSocial} />
          <GithubOutlined className="socialIcon" onClick={loginSocial} />
        </div>
      </Form>
    </div>
  );
}
export default SignInPage;
