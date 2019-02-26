// src/pages/rich/index.js
import React from "react";
import { Card, Button, Modal } from "antd";
import { Editor } from "react-draft-wysiwyg";
import draftjs from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class RichText extends React.Component {
  state = {
    showRichText: false,
    editorContent: "",
    editorState: ""
  };
  handleClearContent = () => {
    //清空文本
    this.setState({
      editorState: "",
      editorContent: ""
    });
  };
  handleGetText = () => {
    //获取文本内容
    this.setState({
      showRichText: true
    });
  };
  onEditorStateChange = editorState => {
    //编辑器的状态
    this.setState({
      editorState
    });
  };
  onEditorChange = editorContent => {
    //编辑器内容的状态
    this.setState({
      editorContent
    });
  };

  render() {
    const { editorState, editorContent } = this.state;
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleClearContent}>
            清空内容
          </Button>
          <Button
            type="primary"
            onClick={this.handleGetText}
            style={{ marginLeft: 10 }}
          >
            获取html文本
          </Button>
        </Card>
        <Card title="富文本编辑器" style={{ marginTop: 10 }}>
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onEditorChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            });
          }}
          footer={null}
        >
          {draftjs(this.state.editorContent)}
        </Modal>
      </div>
    );
  }
}
