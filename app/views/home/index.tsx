import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import style from './index.module.css';
import { Link,useHistory } from 'react-router-dom';

type LayoutType = Parameters<typeof Form>[0]['layout'];

export const Home = (props:any) => {
  let history = useHistory();

  const [form] = Form.useForm();
  const [frame, setFrame] = useState('vue');
  const [uiLib, setUILib] = useState('antd');

  const onFrameChange = (frame:string) => {
    setFrame(frame);
  };

  const onUILibChange = (uiLib:string) => {
    setUILib(uiLib);
  };

  const nextStep = () =>{
    history.push('/gencode');
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
          <Form.Item label="选择框架" name="frame">
            <Radio.Group value={frame}>
              <Radio.Button value="vue">Vue</Radio.Button>
              <Radio.Button value="react">React</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="选择UI库" name="uiLib">
            <Radio.Group value={uiLib}>
              <Radio.Button value="antd">Ant Design</Radio.Button>
              <Radio.Button value="element">Element UI</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" onClick={nextStep}>下一步</Button>
            <Link to="/gencode">GenCode</Link>
          </Form.Item>
        </Form>
      </div>
  );
};
