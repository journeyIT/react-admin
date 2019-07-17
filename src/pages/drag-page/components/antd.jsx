import {Button, Input, Row, Col} from 'antd';
import uuid from "uuid/v4";

export const category = 'Ant Design 组件库';

function button({type, content}) {
    return {
        tagName: 'Button',
        component: Button,
        title: `${content}`,
        import: 'import {Button} from \'antd\'',
        container: false,
        display: 'inline-block',
        defaultProps: {
            type,
            children: [
                {
                    __type: 'text',
                    __id: uuid(),
                    content,
                }
            ],
        },
        props: [
            {
                name: '类型',
                attribute: 'type',
                valueType: 'string',
                defaultValue: 'default', // 如果与defaultValue相同，则不需要在组件上添加这个属性
                formType: 'select',
                options: [
                    {value: 'primary', label: '主'},
                    {value: 'default', label: '次'},
                    {value: 'dashed', label: '虚线'},
                    {value: 'danger', label: '危险'},
                ],
            },
            {
                name: '禁用',
                attribute: 'disabled',
                valueType: 'boolean',
                defaultValue: false,
                formType: 'switch',
                checkedChildren: '是',
                unCheckedChildren: '否',
            },
            {
                name: '幽灵',
                attribute: 'ghost',
                valueType: 'boolean',
                defaultValue: false,
                formType: 'switch',
                checkedChildren: '是',
                unCheckedChildren: '否',
            },
            {
                name: '形状',
                attribute: 'shape',
                valueType: 'string',
                defaultValue: 'default',
                formType: 'select',
                options: [
                    {value: 'default', label: '默认'},
                    {value: 'circle', label: '原形'},
                ],
            },
            {
                name: '大小',
                attribute: 'size',
                valueType: 'string',
                defaultValue: 'default',
                formType: 'select',
                options: [
                    {value: 'default', label: '默认'},
                    {value: 'small', label: '小按钮'},
                    {value: 'large', label: '大按钮'},
                ],
            },
        ],
    };
}

export default {
    ButtonPrimary: button({type: 'primary', content: '主按钮'}),
    Button: button({content: '次按钮'}),
    ButtonDashed: button({type: 'dashed', content: '虚线按钮'}),
    ButtonDanger: button({type: 'danger', content: '危险按钮'}),
    Row: {
        component: Row,
        title: '栅格行',
        import: 'import {Row} from \'antd\'',
        container: true,
        direction: 'horizontal',
        defaultProps: {
            children: [
                {
                    __type: 'Col',
                    __id: uuid(),
                    span: 12,
                },
                {
                    __type: 'Col',
                    __id: uuid(),
                    span: 12,
                }
            ],
        }
    },
    Col: {
        component: Col,
        title: '栅格列',
        import: 'import {Col} from \'antd\'',
        container: true,
        innerWrapper: true,
        defaultProps: {
            span: 12,
        },
        props: [
            {
                name: '格数',
                attribute: 'span',
                valueType: 'number',
                defaultValue: 24,
                formType: 'select',
                options: [
                    {value: 1, label: 1},
                    {value: 2, label: 2},
                    {value: 3, label: 3},
                    {value: 4, label: 4},
                    {value: 5, label: 5},
                    {value: 6, label: 6},
                    {value: 7, label: 7},
                    {value: 8, label: 8},
                    {value: 9, label: 9},
                    {value: 10, label: 10},
                    {value: 11, label: 11},
                    {value: 12, label: 12},
                    {value: 13, label: 13},
                    {value: 14, label: 14},
                    {value: 15, label: 15},
                    {value: 16, label: 16},
                    {value: 17, label: 17},
                    {value: 18, label: 18},
                    {value: 19, label: 19},
                    {value: 20, label: 20},
                    {value: 21, label: 21},
                    {value: 22, label: 22},
                    {value: 23, label: 23},
                    {value: 24, label: 24},
                ],
            },
        ],
    },
    Input: {
        component: Input,
        title: '输入框',
        import: 'import {Input} from \'antd\'',
        container: false,
        display: 'inline-block',
        defaultProps: {
            placeholder: '请输入',
        },
    },
};
