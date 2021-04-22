import { Button, Form, Input, InputNumber, Select } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import { encryptPassword, rules } from '../common'

const { Item } = Form
const { Option } = Select

const Wrapper = styled(Container)`
  min-height: calc(100vh - 56px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 767px) {
    display: block;
  }
`

const Home = () => {
  const [form] = Form.useForm()

  const onFinish = ({ selected, name, salt, length }) => {
    const domain = selected === 0 ? name : rules[selected]

    const password = encryptPassword({
      domain,
      length,
      salt,
    })
    form.setFieldsValue({ password })
  }

  const formStyle = {
    maxWidth: '480px',
    width: '100%',
    height: '380px',
    padding: '15px 0',
  }

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }

  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  }

  return (
    <Wrapper>
      <Form {...layout} form={form} style={formStyle} onFinish={onFinish}>
        <Item label="选择平台" required name="selected" rules={[{ required: true, message: '请选择平台' }]}>
          <Select>
            {rules.map((rule, index) => (
              <Option value={index} key={index}>
                {rule}
              </Option>
            ))}
          </Select>
        </Item>

        <Item noStyle dependencies={['selected']}>
          {({ getFieldValue }) => {
            const selected = getFieldValue('selected')
            if (selected === 0) {
              return (
                <Item label="平台" required name="name" rules={[{ required: true, message: '请输入要加密的账号平台' }]}>
                  <Input placeholder="请输入要加密的账号平台" />
                </Item>
              )
            }
          }}
        </Item>

        <Item
          label="长度"
          required
          initialValue={12}
          name="length"
          rules={[{ required: true, message: '请输入生成密码的长度' }]}
        >
          <InputNumber style={{ width: '100%' }} min={6} max={20} precision={0} />
        </Item>

        <Item label="秘钥" name="salt" required rules={[{ required: true, message: '请输入加密的盐' }]}>
          <Input placeholder="请输入加密的盐" />
        </Item>

        <Item label="密码" name="password">
          <Input placeholder="计算得到的密码" />
        </Item>

        <Form.Item {...tailLayout}>
          <Button color="secondary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default Home
