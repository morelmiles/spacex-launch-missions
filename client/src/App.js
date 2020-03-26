import React from "react";
import Chatkit from "@pusher/chatkit";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";

import { tokenUrl, instanceLocator } from "./config";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      joinableRooms: [],
      joinedRooms: [],
      messages: []
    };
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "Luigi" /* Will have to chanege this value */,
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        console.log(this.currentUser.rooms[3].userIds);
        this.getRooms;
      })
      .catch(err => console.log("Error connecting:", err));
  }

  getRooms() {
    this.currentUser.getJoinableRooms().then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      });
    });
  }

  createRoom(name) {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log("Error on subscribing to room", err));
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(currentRoom => {
        this.setState({ roomId: roomId });
        this.getRooms();
      })
      .catch(err => console.log("error while subscribing", err));
  }
  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  render() {
    return (
      <div className="app">
        <RoomList
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
          subscribeToRoom={this.subscribeToRoom}
          roomId={this.roomId}
        />

        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />

        <NewRoomForm onSubmit={this.createRoom} />

        <SendMessageForm
          sendMessage={this.sendMessage}
          disabled={!this.state.roomId}
        />
      </div>
    );
  }
}

export default App;
