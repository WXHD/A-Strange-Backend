import { useNavigate } from '@tanstack/react-router';
import { Button } from 'antd';
import './index.less';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="home-card">
                <div className="home-header">
                    <h1 className="home-title">
                        Hello Stranger!
                    </h1>
                    <div className="home-buttons">
                        <Button
                            type="primary"
                            size="large"
                            className="login-button"
                            onClick={() => navigate({ to: '/login' })}
                        >
                            登录
                        </Button>
                        <Button
                            type="default"
                            size="large"
                            className="register-button"
                            onClick={() => navigate({ to: '/register' })}
                        >
                            注册
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;