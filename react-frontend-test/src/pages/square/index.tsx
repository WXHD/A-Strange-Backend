import { Card, Col, Row, Typography } from 'antd';
import { useNavigate } from '@tanstack/react-router';

import './index.less';
const { Title, Paragraph } = Typography;

// 定义应用类型
interface AppInfo {
    id: number;
    name: string;
    description: string;
    icon: string;
    category: string;
    route: string;
}

const SquarePage = () => {
    const navigate = useNavigate();

    const appList: AppInfo[] = [
        {
            id: 1,
            name: '用户管理',
            description: '管理用户信息，包括增删改查功能',
            icon: '👥',
            category: '管理系统',
            route: '/square/users',
        },
        {
            id: 2,
            name: '数据分析',
            description: '强大的数据分析和可视化工具',
            icon: '📊',
            category: '分析工具',
            route: '/square',
        },
        {
            id: 3,
            name: '文件存储',
            description: '安全可靠的云存储解决方案',
            icon: '💾',
            category: '存储服务',
            route: '/square',
        },
        {
            id: 4,
            name: '即时通讯',
            description: '实时聊天和消息传递系统',
            icon: '💬',
            category: '社交应用',
            route: '/square',
        },
        {
            id: 5,
            name: '任务调度',
            description: '自动化任务管理和调度平台',
            icon: '⏰',
            category: '工具平台',
            route: '/square',
        },
        {
            id: 6,
            name: '监控告警',
            description: '实时监控系统状态并发送告警',
            icon: '🔔',
            category: '运维工具',
            route: '/square',
        }
    ];

    return (
        <div className="square-page">
            <div className="square-header">
                <Title level={2}>应用广场</Title>
                <Paragraph type="secondary">探索和管理您的应用程序</Paragraph>
            </div>

            <Row gutter={[24, 24]}>
                {appList.map((app) => (
                    <Col xs={24} sm={12} md={8} lg={8} xl={6} key={app.id}>
                        <Card
                            className="app-card"
                            hoverable
                            cover={
                                <div className="app-icon">
                                    <span className="icon">{app.icon}</span>
                                </div>
                            }
                            onClick={() => navigate({ to: app.route })}
                        >
                            <Card.Meta
                                title={<span className="app-title">{app.name}</span>}
                                description={
                                    <>
                                        <Paragraph className="app-description" ellipsis={{ rows: 2 }}>
                                            {app.description}
                                        </Paragraph>
                                        <div className="app-category">{app.category}</div>
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default SquarePage;