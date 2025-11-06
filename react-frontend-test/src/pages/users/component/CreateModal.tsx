import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';

import ManageUserCreateForm from './ManageUserCreateForm';

type CreateProps = {
    isModelShow: boolean;
    onCancel: () => void;
    upData?: () => void;
};

const CreateModal: React.FC<CreateProps> = ({
    isModelShow: isOpen,
    onCancel,
    upData,
}) => {
    return (
        <>
            <Modal
                title={'用户管理-新增用户'}
                onCancel={onCancel}
                centered
                open={isOpen}
                closeIcon={<CloseCircleOutlined />}
                width={'554px'}
                footer={null}
            >
                <ManageUserCreateForm
                    onCancel={onCancel}
                    upData={upData}
                />
            </Modal>
        </>
    );
};

export default CreateModal;