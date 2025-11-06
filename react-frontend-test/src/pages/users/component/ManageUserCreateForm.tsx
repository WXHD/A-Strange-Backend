import { Button, Form, Input } from "antd";

import { userService } from "@service/user-service";
import './UserInfoForm.less';

interface FormParams {
    onCancel: () => void;
    upData?: () => void;
};

const ManageUserModifyForm: React.FC<FormParams> = ({ onCancel, upData }) => {
    const onFinish = (values: any) => {
        console.log('Received values:', values);
        userService.addUser({ ...values }).then(() => {
            window.globalMessage.success(`创建成功`);
            upData && upData();
            onCancel();
        });
    };

    return (
        <>
            <Form
                name="create"
                onFinish={onFinish}
            >
                <div className="text-black">用户名</div>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input
                        placeholder="用户名"
                        size="large"
                        className="white-input"
                    />
                </Form.Item>

                <div className="text-black">密码</div>
                <Form.Item
                    name="pwd"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password
                        placeholder="密码"
                        size="large"
                        className="white-input"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="w-full"
                    >
                        创建
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default ManageUserModifyForm;