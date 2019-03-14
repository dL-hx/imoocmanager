// src\pages\ui\gallery.js
import React from "react";
import { Card, Row, Col, Modal } from "antd";
export default class Gallery extends React.Component {
  state = {
    visible: false
  };
  openGallery = imgSrc => {
    //通过这个方法获得图片,弹出model,将图片保存到,currentImg
    this.setState({
      visible: true,
      currentImg: "/gallery/"+ imgSrc
    });
  };
  render() {
    //定义二维数组去存图片
    //可以使用两层循环(map),去定义  二维数组

    /*
        var a = [1,2,3];
        var b = a.map(function (i) {return i*2})
        console.log(a);//[1,2,3]
        console.log(b);//[2,4,6]
         */

    const imgs = [
      ["1.png", "2.png", "3.png", "4.png", "5.png"],
      ["6.png", "7.png", "8.png", "9.png", "10.png"],
      ["11.png", "12.png", "13.png", "14.png", "15.png"],
      ["16.png", "17.png", "18.png", "19.png", "20.png"],
      ["21.png", "22.png", "23.png", "24.png", "25.png"]
    ];
    const imgList = imgs.map((list, key) =>
      list.map((item) => (
        <Card
          style={{ marginBottom: 10 }}
          cover={
            <img
              key={key}
              src={"/gallery/" + item}
              onClick={() => this.openGallery(item)}
            />
          }
        >
          <Card.Meta title="React Admin" description="I love Imooc" />
        </Card>
      ))
    );
    return (
      //一行5列
      <div className="card-wrap">
        <Row gutter={10}>
          <Col md={5}>{imgList[0]}</Col>
          <Col md={5}>{imgList[1]}</Col>
          <Col md={5}>{imgList[2]}</Col>
          <Col md={5}>{imgList[3]}</Col>
          <Col md={4}>{imgList[4]}</Col>
        </Row>
        <Modal
          width={300}
          height={500}
          visible={this.state.visible}
          title="图片画廊"
          onCancel={() => {
            this.setState({
              visible: false
            });
          }}
          footer={null}
        >
          {<img src={this.state.currentImg} style={{width:"100%"}}/>}
        </Modal>
      </div>
    );
  }
}
