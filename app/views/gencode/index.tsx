import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import style from './index.module.css';

type LayoutType = Parameters<typeof Form>[0]['layout'];

export const GenCode = () => {
  const [form] = Form.useForm();
  const [frame, setFrame] = useState('vue');
  const [uiLib, setUILib] = useState('antd');

  console.log(style);
  
  const onFrameChange = (frame:string) => {
    setFrame(frame);
  };

  const onUILibChange = (uiLib:string) => {
    setUILib(uiLib);
  };


  const buttonItemLayout ={
    wrapperCol: { span: 14, offset: 6 },
  };

  const formItemLayout ={
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
      <div className={style.center}>
        <Form
          form={form}
          {...formItemLayout}
        >
          <Form.Item label="1" name="frame">
            
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">下一步</Button>
          </Form.Item>
        </Form>
      </div>
  );
};
