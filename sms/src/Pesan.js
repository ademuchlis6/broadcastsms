import logo from './logo.svg';
import './App.css';
import { Component,Text, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Form,Input,Tooltip, message, Divider,InputNumber } from 'antd';
import axios from 'axios';
import { Container,Row, Col, Button } from 'react-bootstrap';


const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
        md: { span: 10 },
        lg: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 100 },
        sm: { span: 100 },
        md: { span: 100 },
        lg: { span: 18 },
    }
  };

const Pesan = (props) => {
    const [form] = Form.useForm();

    const [number, setNumber] = useState(62) 
    const regexp = /^[0-9\b]+$/
    const onHandleNumberChange = (e) => {
        alert(e.target.value);
        if (regexp.test(e.target.value)) {
            setNumber({ [e.target.name]: number });
            form.setFieldsValue({
                nomor: 'Mario',
            });
        }
      };
  
    let table = [];
    return(
    <Form.List name="kirim">
        {(fields, { add, remove }) => {
         return (
          <div >
            {fields.map((field, index) => (            
              <div key={field.key}>
                <div style={{paddingTop:5}}>
            <Row>
              <Col sm={3}>
              <Form.Item
                      {...formItemLayout}
                      name={[index, "nomor"]}
                      label="Nomor Hp"
                      rules={
                          [
                              {
                                  required: true, message: 'Nomor Hp Diperlukan'
                              }
                          ]
                      }
                  >
                      <Input
                       placeholder='Masukkan Nomor Hp' maxLength={16}/>
                  </Form.Item>
              </Col>
              <Col sm={9}>
              <Form.Item
                      {...formItemLayout}
                      name={[index, "pesan"]}
                      label="Pesan"
                      rules={
                          [
                              {
                                  required: true, message: 'Pesan Diperlukan, max 150 character'
                              }
                          ]
                      }
                  >
                      <Input.TextArea style={{ width: 500 }} maxLength={150} />
                 </Form.Item>
              </Col>
            </Row>
          </div>                  
                {fields.length > 1 ? (
                  <Button
                      variant="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  >
                    Hapus pesan diatas
                  </Button>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
            {fields.length <10 ? (
              <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: "60%" }}
            >
              Tambah Pesan
            </Button>
                ) :  message.error({
                  content: 'maksimal 10 Pesan',
                  className: 'custom-class',
                  style: {
                    marginTop: '20vh',
                  },
                })}
            </Form.Item>
          </div>
        );
        }}
    </Form.List>
    )
    

    }

    export default Pesan;