import { Button, Form, Input } from "antd";

import type { UserItem } from "@type/user";
import { userService } from "@service/user-service";
import './UserInfoForm.less';

interface FormParams {
    user: UserItem;
    onCancel: () => void;
    upData?: () => void;
};

const ManageUserModifyForm: React.FC<FormParams> = ({ user, onCancel, upData }) => {
    const onFinish = (values: any) => {
        console.log('Received values:', values);
        userService.updateUser({ ...values }).then(() => {
            window.globalMessage.success(`编辑成功`);
            upData && upData();
            onCancel();
        });
    };

    return (
        <>
            <Form
                name="modify"
                onFinish={onFinish}
                initialValues={user}
            >
                <div className="text-black">ID</div>
                <Form.Item
                    name="id"
                >
                    <Input
                        size="large"
                        disabled
                        className="white-input"
                    />
                </Form.Item>

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

                <div className="text-black">创建时间</div>
                <Form.Item
                    name="created_at"
                >
                    <Input
                        size="large"
                        disabled
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
                        编辑
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default ManageUserModifyForm;