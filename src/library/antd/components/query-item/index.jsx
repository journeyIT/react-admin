import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Button} from 'antd';
import FormElement from '../form-element';
import './index.less';

/**
 * 查询条件封装，通过传入items即可生成查询条件
 * item属性：
 * collapsedShow： 收起时，是否显示，用来区分展开/收起时所显示哪些项
 * 其他参见 FormElement 属性
 */
@Form.create()
export default class QueryItem extends Component {

    static propTypes = {
        showSubmit: PropTypes.bool,
        submitText: PropTypes.any,
        showReset: PropTypes.bool,
        buttonContainerStyle: PropTypes.string,
        resetText: PropTypes.any,
        collapsed: PropTypes.bool,
        items: PropTypes.array,
        itemWidth: PropTypes.number,
        itemLabelWidth: PropTypes.number,
        onSubmit: PropTypes.func,
        formRef: PropTypes.func,
        extra: PropTypes.any,
        loadOptions: PropTypes.func,
        buttonAlone: PropTypes.bool,
    };

    static defaultProps = {
        showSubmit: true,
        submitText: '查询',
        showReset: true,
        resetText: '重置',
        buttonAlone: false,
        collapsed: false,
        items: [],
        onSubmit: () => true,
        extra: null,
    };

    state = {};

    componentWillMount() {
        const {formRef, form, loadOptions} = this.props;

        if (formRef) formRef(form);

        if (loadOptions) {
            const result = loadOptions(form);

            if (result instanceof Promise) {
                loadOptions(form).then((data) => this.setState(data));
            }

            if (typeof result === 'object') {
                this.setState(result);
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {onSubmit, form} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                onSubmit(values);
            }
        });
    };

    render() {
        const {
            items,
            itemWidth,
            itemLabelWidth,
            showSubmit,
            submitText,
            showReset,
            resetText,
            collapsed,
            form,
            extra,
            buttonContainerStyle,
            buttonAlone,
        } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                {
                    /*
                     * items 中元素为数组，则数组中所有表单元素占一行
                     *       如果不是数组，则独自占一行
                     * 查询按钮，拼接到最后一行
                     * */
                    items.map((data, index) => {
                        if (!Array.isArray(data)) {
                            data = [data];
                        }
                        return (
                            <div key={index} className="query-item-element-container">
                                {data.map(item => {
                                    let {itemStyle = {}, width = itemWidth, labelWidth = itemLabelWidth, field, collapsedShow, ...others} = item;
                                    const style = {display: 'block'};

                                    if (width) {
                                        itemStyle = {flex: `0 0 ${width}px`, ...itemStyle};
                                    }

                                    const options = this.state[field];
                                    if (options && !others.options) others.options = options;

                                    if (collapsed && !collapsedShow) {
                                        style.display = 'none'
                                    }

                                    return (
                                        <div
                                            key={field}
                                            style={{...itemStyle, ...style}}
                                        >
                                            <FormElement
                                                form={form}
                                                field={field}
                                                labelWidth={labelWidth}
                                                {...others}
                                            />
                                        </div>
                                    );
                                })}
                                {!buttonAlone && index === items.length - 1 && (showSubmit || showReset || extra) ? (
                                    <div className="query-item-button-container" style={{...buttonContainerStyle, paddingTop: '7px'}}>
                                        {showSubmit ? (
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                icon="search"
                                            >
                                                {submitText}
                                            </Button>
                                        ) : null}
                                        {showReset ? (
                                            <Button
                                                type="ghost"
                                                icon="rollback"
                                                onClick={() => form.resetFields()}
                                            >
                                                {resetText}
                                            </Button>
                                        ) : null}
                                        {extra}
                                    </div>
                                ) : null}
                            </div>
                        );
                    })
                }
                {buttonAlone ? (
                    <div className="query-item-button-container" style={{...buttonContainerStyle, paddingTop: '4px'}}>
                        {showSubmit ? (
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon="search"
                            >
                                {submitText}
                            </Button>
                        ) : null}
                        {showReset ? (
                            <Button
                                type="ghost"
                                icon="rollback"
                                onClick={() => form.resetFields()}
                            >
                                {resetText}
                            </Button>
                        ) : null}
                        {extra}
                    </div>
                ) : null}
            </Form>
        );
    }
}
