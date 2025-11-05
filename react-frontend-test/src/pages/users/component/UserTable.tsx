import { useEffect, useImperativeHandle, useMemo, useState, type ForwardRefRenderFunction, forwardRef } from "react";
import { Button, Table, type TableProps } from "antd";

import type { UserItem } from "@type/user";
import { userService } from "@service/user-service";

interface TableParams {
    pagination: {
        current: number;
        pageSize: number;
        showQuickJumper: boolean;
        showSizeChanger: boolean;
        showTotal: (total: number) => string;
        total: number;
    };
}

interface refType {
    upData: ((param: any) => void) | undefined;
}

interface QueryParams {
    limit?: number;
    offset?: number;
}

const UserTableComponent: ForwardRefRenderFunction<refType> = (_, ref) => {
    const [loading, setLoading] = useState(false);
    // 表单参数
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            total: 0,
        },
    });
    // 显示的用户
    const [users, setUsers] = useState<UserItem[]>([]);

    // 获取用户列表
    const fetchUsers = async (params: QueryParams) => {
        await userService.getUserList({
            limit: params.limit || 10,
            offset: params.offset || 0,
        }).then(res => {
            setUsers(res.users);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res.total,
                },
            });
        }).finally(() => { });
    };

    useEffect(() => {
        // 每5秒刷新一次数据
        const intervalId = setInterval(() => {
            const params: QueryParams = {
                limit: tableParams.pagination.pageSize,
                offset: (tableParams.pagination.current - 1) * tableParams.pagination.pageSize,
            };
            fetchUsers(params);
        }, 5000);
        // 清理函数，组件卸载时清除定时器
        return () => {
            clearInterval(intervalId);
        };
    }, [
        tableParams.pagination.current,
        tableParams.pagination.pageSize,
    ]);

    useEffect(() => {
        const params: QueryParams = {
            limit: tableParams.pagination.pageSize,
            offset: (tableParams.pagination.current - 1) * tableParams.pagination.pageSize,
        };
        setLoading(true);
        fetchUsers(params);
        setLoading(false);
    }, [
        tableParams.pagination.current,
        tableParams.pagination.pageSize,
    ]);

    const upData = () => {
        const params: QueryParams = {
            limit: tableParams.pagination.pageSize,
            offset: 0,
        };
        fetchUsers(params);
    };
    // 暴露 upData 方法给父组件
    useImperativeHandle(ref, () => ({
        upData: upData,
    }));

    // 列定义
    const columns: TableProps<UserItem>["columns"] = useMemo(() => {
        return [
            {
                title: "ID",
                dataIndex: "id",
                key: "id",
                width: "8%",
            },
            {
                title: "用户名",
                dataIndex: "username",
                key: "username",
                width: "16%",
                ellipsis: true,
            },
            {
                title: "注册时间",
                dataIndex: "created_at",
                key: "created_at",
            },
            {
                title: "操作",
                key: "action",
                fixed: "right",
                width: "16%",
                render: () => (
                    [
                        <Button
                            type="link"
                        >
                            编辑
                        </Button>,
                        <Button
                            type="link"
                            danger
                        >
                            删除
                        </Button>,
                    ]
                ),
            },
        ];
    }, [tableParams]);

    const handleTableChange: TableProps<UserItem>["onChange"] = (
        pagination,
    ) => {
        setTableParams((prev) => ({
            pagination: {
                ...prev.pagination,
                pageSize: pagination?.pageSize || 10,
                current: pagination?.current || 1,
            },
        }));
    };

    return (
        <>
            <Table<UserItem>
                className="users-table"
                scroll={{ x: "max-content", y: 400 }}
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={users}
                pagination={{
                    ...tableParams.pagination,
                }}
                loading={loading}
                onChange={handleTableChange}
            />
        </>
    );
};

const UserTable = forwardRef(UserTableComponent);
export default UserTable;