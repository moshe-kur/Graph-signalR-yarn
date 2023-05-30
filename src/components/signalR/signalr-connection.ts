import * as signalR from "@microsoft/signalr";
import React, { useRef } from "react";
import { Toast } from "primereact/toast";

const URL = process.env.HUB_ADDRESS ?? "https://localhost:7021/hub"; //or whatever your backend port is
class Connector {
  private connection: signalR.HubConnection;
  public events: (
    onMessageReceived: (username: string, message: string, date: string) => void
  ) => void;

  static instance: Connector;
  constructor() {
    // debugger;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();
    this.connection
      .start()
      .then(() => {})
      .catch((error) => {
        console.error("SignalR connection failed:", error);
      })
      .finally(() => {
        console.log("SignalR connection state is:", this.connection.state);
      });
    this.events = (onMessageReceived) => {
      this.connection.on("ReceiveMessage", (username, message, date) => {
        onMessageReceived(username, message, date);
      });
    };
  }
  public newMessage = (
    username: string,
    messages: string,
    date: string
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (this.connection.state === signalR.HubConnectionState.Connected) {
        this.connection
          .send("SendMessage", username, messages, date)
          .then(() => {
            console.log("sent", username, messages, date);
            resolve();
          })
          .catch((error) => {
            console.error("Failed to send message:", error);
            reject();
          });
      } else {
        console.log("No SignalR connection. Message not sent.");
        reject();
      }
    });
  };
  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}
export default Connector.getInstance;

// import React from 'react'
// import { createSignalRContext } from "react-signalr";
// const SignalRContext = createSignalRContext();
// const SignalR = () => {
//     const { token } = StoreAuthentication.useState();
//   return (
//     <div>SignalR</div>
//   )
// }
// export default SignalR
