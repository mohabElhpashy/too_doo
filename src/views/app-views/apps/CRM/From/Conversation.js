import React from "react";
import ChatData from "assets/data/chat.data.json";
import { Avatar, Divider, Input, Form, Button, Menu } from "antd";
import {
  FileOutlined,
  SendOutlined,
  PaperClipOutlined,
  SmileOutlined,
  AudioMutedOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Scrollbars } from "react-custom-scrollbars";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import service from "auth/FetchInterceptor";
import IMG from '../../../../../../src/Capture_______.PNG'

const image=IMG

const menu = () => (
  <Menu>
    <Menu.Item key="0">
      <UserOutlined />
      <span>User Info</span>
    </Menu.Item>
    <Menu.Item key="1">
      <AudioMutedOutlined />
      <span>Mute Chat</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <DeleteOutlined />
      <span>Delete Chat</span>
    </Menu.Item>
  </Menu>
);

export class Conversation extends React.Component {
  formRef = React.createRef();
  chatBodyRef = React.createRef();

  state = {
    info: {},
    msgList: [],
    input:""
  };

  componentDidMount() {
    this.getConversation(this.getUserId());
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.getConversation(this.getUserId());
    }
    // this.scrollToBottom();
  }

  getUserId() {
    const { id } = this.props.match.params;
    return parseInt(parseInt(id));
  }

  getConversation = async(currentId) => {
    try {
      console.log("current id",currentId)
  
      const chat = await service.get(`web/chat_rooms/room/${currentId}`).then(
        res=>  {
          
          console.log("res ALLChat",res)
          var data=res.map(v => ({...v, from: 'opposite'}))
          // setclint({Client:test.client_first_name,Seller:test.seller_first_name})
          // setchating(res)
          // setOpenChat(true);
          this.setState({
            // info: data[0],
            msgList: data,
          });
    
        }
      )
    } catch (error) {
      }
    // const data = ChatData.filter((elm) => elm.id === currentId);
   
    console.log("mCurrent id",currentId)
  };

  getMsgType = (obj) => {
    // console.log("obj",obj )

    switch (obj.Type) {
      case "text":
        return <span
        //  style={{
        //   border: "1px solid gainsboro",
        // backgroundColor: "#f5f5f5",
        // padding: "15px",
        // borderRadius: "12px",
        // fontWeight: "600"
        // }}
        >
          {obj.Text}</span>;
      case "image":
        return <img
         style={{width:"300px",height:"400px",border:"1px solid black",display:"flex"}} 
         src={obj.URI} alt={obj.URI} />;
      case "file":
        return (
          <Flex alignItems="center" className="msg-file">
            <FileOutlined className="font-size-md" />
            <span className="ml-2 font-weight-semibold text-link pointer">
              <u>{obj.Text}</u>
            </span>
          </Flex>
        );
      default:
        return null;
    }
  };

  // scrollToBottom = () => {
  //   this.chatBodyRef.current.scrollToBottom();
  // };

  onSend =async (values) => {
    if (values.newMsg) {
      console.log("mohabmessae",values)
      const newMsgData = {
        avatar: "",
        from: "me",
        Type: "text",
        Text: values.newMsg,
        time: "",
        // from: 'opposite'
      };
      this.formRef.current.setFieldsValue({
        newMsg:``,
      });
      try {
        // console.log("current id",currentId)
    
        const chat = await service.post(`web/chat_rooms/insert_to_chat`,{
          client_id:localStorage.getItem("client_id"),
          message:this.state.input,
          room_id:this.getUserId()
        }).then(
          res=>  {
            
            console.log("res ALLChat",res)
          
      
          }
        )
      } catch (error) {
        }
      this.setState({
        msgList: [...this.state.msgList, newMsgData],
      });
    }
    console.log("my all data to send",this.getUserId(),"client_id",localStorage.getItem("client_id"),this.state.input)
  };

  emptyClick = (e) => {
    e.preventDefault();
  };
     getText(e) {
    // console.log("text",)
    // this.setState({input:})
   
  }
  chatContentHeader = (name) => (
    <div className="chat-content-header">
      <h4 className="mb-0">{name}</h4>
      <div>
        <EllipsisDropdown menu={menu} />
      </div>
    </div>
  );

  chatContentBody = (props, id) => (
    <div className="chat-content-body">
      <Scrollbars ref={this.chatBodyRef} autoHide>
        {props.map((elm, i) => (
          <div

            key={`msg-${id}-${i}`}
            className=
            {`
            msg ${elm.CreatedAt === 'date'? 'datetime' : ''} 
            ${elm.from === 'opposite'? 'msg-recipient' : elm.from === 'me'? 'msg-sent' : ''}`}

            // className={`msg ${elm.msgType === "date" ? "datetime" : ""} ${
            //   elm.AuthorId.includes("s")
            //     ? "msg-recipient"
            //     : elm.from === "me"
            //     ? "msg-sent"
            //     : ""
            // }`}
          >
            
              <div className="mr-2">
                <Avatar src={image} />
              </div>
        {
								elm.text?
								<div className={`bubble ${!image? 'ml-5' : ''}`}>
									<div className="bubble-wrapper">
										{this.getMsgType(elm)}
									</div>
								</div>
								:
								null
							} 
              <div
               className={`bubble ${!image? "ml-5" : ""}`}
               >
                <div className="bubble-wrapper">{this.getMsgType(elm)}</div>
              </div>
            {/* {elm.CreatedAt? <Divider>{elm.CreatedAt.slice(0,10)}</Divider> : null} */}
          </div>
        ))}
      </Scrollbars>
      {/* {this.state.input} */}
    </div>
  );

  chatContentFooter = () => (
    <div className="chat-content-footer">
      <Form
        name="msgInput"
        ref={this.formRef}
        onFinish={this.onSend}
        className="w-100"
      >
        <Form.Item name="newMsg" className="mb-0">
          <Input
          // disabled
          onChange={(e)=>this.setState({input:e.target.value})}
          value={this.state.input}
          autoComplete="off"
            placeholder="Type a message..."
            suffix={
              <div className="d-flex align-items-center">
                <a
                  href="/#"
                  className="text-dark font-size-lg mr-3"
                  onClick={this.emptyClick}
                >
                  <SmileOutlined />
                </a>
                <a
                  href="/#"
                  className="text-dark font-size-lg mr-3"
                  onClick={this.emptyClick}
                >
                  
                  <PaperClipOutlined />
                </a>
                <Button
                  shape="circle"
                  type="primary"
                  size="small"
                  onClick={this.onSend}
                  htmlType="submit"
                >
                  <SendOutlined />
                </Button>
              </div>
            }
          />
        </Form.Item>
      </Form>
    </div>
  );

  render() {
    console.log("my name",this.state.input)

    const { id } = this.props.match.params;
    const { info, msgList } = this.state;
    return (
      <div className="chat-content">
        {this.chatContentHeader(localStorage.getItem("name"))}
        {this.chatContentBody(msgList, id)}
        {this.chatContentFooter()}
      </div>
    );
  }
}

export default Conversation;
