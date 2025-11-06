import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';

import type { UserItem } from '@type/user';
import { userService } from '@service/user-service';

type DeleteProps = {
    isModelShow: boolean;
    onCancel: () => void;
    deleteItem: UserItem[];
    upData?: () => void;
};

const DeleteModal: React.FC<DeleteProps> = ({
    isModelShow: isOpen,
    onCancel,
    deleteItem,
    upData,
}) => {
    // 取消
    const cancelModal = () => {
        onCancel();
    };

    // 确认删除
    const submitDel = () => {
        const deleteUser = async () => {
            await Promise.all(
                deleteItem.map(async (item: UserItem) => {
                    await userService.deleteUser({ id: item.id });
                })
            ).finally(() => {
                upData && upData();
                onCancel();
            });
        };
        deleteUser();
    };

    return (
        <>
            <Modal
                title={'用户管理-删除用户'}
                centered
                open={isOpen}
                onCancel={cancelModal}
                closeIcon={<CloseCircleOutlined />}
                width={'554px'}
                footer={[
                    <Button key="back" onClick={cancelModal}>
                        取消
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        onClick={submitDel}
                    >
                        确定
                    </Button>,
                ]}
            >
                {deleteItem.length > 1 ? (
                    <div>是否删除所选的{deleteItem.length}个用户？</div>
                ) : (
                    <div>是否删除用户 {deleteItem[0]?.username} ？</div>
                )}
            </Modal>
        </>
    );
};

export default DeleteModal;