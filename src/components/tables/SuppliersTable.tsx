"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { Supplier } from "@prisma/client";

type Record = {
    key: string;
};

type Props<T> = {
    datasource: T[];
    id: number;
};

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default function SuppliersTable<TDataSource extends Record>({ datasource }): TDataSource {
    const [form] = Form.useForm();
    const [data, setData] = useState<TDataSource[]>([]);
    const [editingKey, setEditingKey] = useState("");

    console.log(datasource);

    // useEffect(() => {
    //   setData(datasource);
    // }, [datasource]);

    const isEditing = (record: Record) => record.key === editingKey;

    const edit = (record: Partial<Record> & { key: React.Key }) => {
        form.setFieldsValue({ name: "", age: "", address: "", ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Record;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const columns = [
        {
            title: "name",
            dataIndex: "name",
            width: "25%",
            editable: true,
        },
        {
            title: "age",
            dataIndex: "age",
            width: "15%",
            editable: true,
        },
        {
            title: "address",
            dataIndex: "address",
            width: "40%",
            editable: true,
        },
        {
            title: "operation",
            dataIndex: "operation",
            render: (_: any, record: Record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Record) => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={datasource?.length > 0 ? datasource : []}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
}
