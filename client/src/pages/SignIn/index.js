import { Button, Form, Input, Typography, Divider, message } from 'antd';
import {
  GoogleOutlined,
  FacebookFilled,
  GithubOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined,
  KeyOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login, register } from '../../redux/actions';
import './style.css';

function SignIn() {
  const [isRegister, setIsRegister] = useState(false);
  const [title, setTitle] = useState('Login to your Account');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userProfile = useSelector((state) => state.profile);

  const loginSocial = () => {
    message.success('Login Success!');
  };

  const handleSubmit = (val) => {
    isRegister ? dispatch(register(val)) : dispatch(login(val));
  };

  useEffect(() => {
    isRegister ? setTitle('Create an account') : setTitle('Login to your Account');
    token && navigate('/');
  }, [isRegister, token]);

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('The two passwords you entered do not match!');
    },
  });

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
          {title}
        </Typography.Title>
        {isRegister && (
          <Form.Item
            className="form-item"
            rules={[
              {
                required: true,
                message: 'Please enter your name',
              },
            ]}
            label={
              <span>
                <UserOutlined style={{ marginRight: 8 }} />
                Name
              </span>
            }
            name="name"
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
        )}
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
        {isRegister && (
          <Form.Item
            className="form-item"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
              validatePassword,
            ]}
            label={
              <span>
                <KeyOutlined style={{ marginRight: 8 }} />
                Confirm Password
              </span>
            }
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
          >
            <Input.Password placeholder="Enter password again" />
          </Form.Item>
        )}
        <Button style={{ marginTop: 16 }} type="primary" htmlType="submit" block>
          {isRegister ? 'Register' : 'Login'}
        </Button>
        {!isRegister ? (
          <Typography.Text style={{ fontSize: 20 }}>Not a member?</Typography.Text>
        ) : (
          <Typography.Text style={{ fontSize: 20 }}>Do you have an account?</Typography.Text>
        )}

        <Typography.Text
          style={{ fontSize: 20, color: '#1677ff', cursor: 'pointer' }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Login' : 'Register'}
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
export default SignIn;
