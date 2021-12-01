// import logo from './logo.svg';
import './App.css';
import { Component, Text, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Form, Input, Tooltip, message, Divider, Modal } from 'antd';
import axios from 'axios';
import Pesan from './Pesan';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import key from {process.env.PUBLIC_URL+"/public/key.json"};
import Loading from "./Loading";

const { TextArea } = Input;
const FormItem = Form.Item;
const App = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
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

  const [form] = Form.useForm();
  const [jumForm, setJumForm] = useState(1)
  const [secret, setSecret] = useState()
  const [errAxios, setErrAxios] = useState()
  const [isloading, setIsloading] = useState(false)

  const tambahForm = () => {
    if (jumForm < 10) {
      setJumForm(jumForm + 1)
    } else {
      // alert("maksimal 10");
      message.success({
        content: 'maksimal 10',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
    }
  }
  const kurangForm = () => {
    if (jumForm > 1) {
      setJumForm(jumForm - 1)
    } else {
      // alert("minimal 1");
      message.success({
        content: 'minimal 1',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
    }
  }

  let a = []

  const kirim = () => {
    form.validateFields().then((values) => {
      for (let i = 0; i < jumForm; i++) {
        console.log('log', this[values.pesan0])
      }
      let data = {
        secret: 'secret',
        kirim: values,
      };
      axios.post(`https://jsonplaceholder.typicode.com/users`, { data })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }).catch((err) => {
      console.log(err);
    })
  }
  const createTable1 = () => {
    let table = []
    for (let i = 0; i < jumForm; i++) {
      table.push(
        <div style={{ paddingTop: 5 }}>
          <Row>
            <Col sm={4}>
              <Form.Item
                {...formItemLayout}
                label='Nomor Hp: '
                name={'nomor' + i}
                rules={
                  [
                    {
                      required: true, message: 'Nomor Hp Diperlukan'
                    }
                  ]
                }
              >
                <Input onChange={(value) => { alert(value) }} placeholder='Masukkan Nomor Hp' />
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item
                {...formItemLayout}
                label='pesan: '
                name={'pesan' + i}
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
      )
    }
    return table
  }


  function handleFinish(values) {
    fetch("./key.json").then(
      function (res) {
        return res.json()
      }).then(function (keyJson) {
        if (typeof values.kirim !== 'undefined') {
          setIsloading(true);
          // console.log("VALUES", key);        
          let data = {
            secret: keyJson.secret,
            data: values,
          };
          axios.post('http://localhost:8090/smsreceiver/kirim.php', data, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(res => {
              setIsloading(false);
              form.resetFields();
              Modal.success({
                title: res.data.message,
                // content: "Penandatangan berhasil disimpan"
              });
              // message.modal({
              //   content: res.data.message,
              //   className: 'custom-class',
              //   style: {
              //     marginTop: '20vh',
              //   },
              // });
            })
            .catch(error => {
              setIsloading(false);
              message.error({
                content: 'ada error di server sms',
                className: 'custom-class',
                style: {
                  marginTop: '20vh',
                },
              });
            });
        } else {
          message.error({
            content: 'Tambahakan pesan',
            className: 'custom-class',
            style: {
              marginTop: '20vh',
            },
          });

        }

      }).catch(
        function (err) {
          message.error({
            content: 'Tool sms butuh Key',
            className: 'custom-class',
            style: {
              marginTop: '20vh',
            },
          });
        }
      )

  }

  return (
    <div style={{ paddingLeft: 20, paddingTop: 20 }}>
      {isloading ? <Loading /> : null}
      <Row >
        <Col>
          Nomor Hp pake format 62<br></br>
          {/* <Button style={{marginRight:5}} variant="primary" onClick={()=>tambahForm()}>Tambah</Button>
            <Button style={{marginRight:5}} variant="danger" onClick={()=>kurangForm()}>Kurang</Button> */}
          {/* <Button variant="success" onClick={()=>kirim()}>kirim</Button> */}
        </Col>
      </Row>
      <Form {...layout} form={form} layout={'horizontal'} onFinish={handleFinish} initialValues={{
        nomor: 62
      }}>
        <Pesan />
        <Form.Item>
          <Button variant="success" type="submit">
            kirim
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

}

export default App;
