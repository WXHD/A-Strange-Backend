import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';

import type { UserItem } from '@type/user';
import ManageUserModifyForm from './ManageUserModifyForm';

type EditProps = {
    isModelShow: boolean;
    onCancel: () => void;
    editItem: UserItem;
    upData?: () => void;
};

const EditModal: React.FC<EditProps> = ({
    isModelShow: isOpen,
    onCancel,
    editItem,
    upData,
}) => {
    return (
        <>
            <Modal
                title={'用户管理-编辑用户'}
                onCancel={onCancel}
                centered
                open={isOpen}
                closeIcon={<CloseCircleOutlined />}
                width={'554px'}
                footer={null}
            >
                <ManageUserModifyForm
                    user={editItem}
                    onCancel={onCancel}
                    upData={upData}
                />
            </Modal>
        </>
    );
};

export default EditModal;