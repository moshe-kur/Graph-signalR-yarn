import React, { useEffect, useRef, useState } from "react";
import Connector from "./signalr-connection";
import { Button } from "primereact/button";
import { useAuth0 } from "@auth0/auth0-react";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  charCountState,
  counttableState,
  tableState,
  textState,
} from "../recoil/recoilAtom";
import { Toast } from "primereact/toast";
export interface Line {
  id: string;
  message: string;
  user: string;
  date: string;
}
const SignalR = () => {
  const { user } = useAuth0();
  const { newMessage, events } = Connector();
  const [userName, setUserName] = useState(user?.name);

  const [text, setText] = useRecoilState(textState);
  const [tablerecoil, settablerecoil] = useRecoilState(tableState);
  const tablerecoilVal: string[] = useRecoilValue(counttableState);
  console.log(tablerecoilVal);
  const count = useRecoilValue(charCountState);

  const [newLine, setNewLine] = useState<Line>({
    id: "2",
    user: user?.name || "",
    message: "",
    date: new Date().toLocaleString(),
  });

  const [tableData, settableData] = useState<Line[]>([
    {
      id: "1",
      user: "Jane Doe",
      message: "initial value",
      date: new Date().toLocaleString(),
    },
  ]);
  const toast = useRef<Toast>(null);

  const sendMessage = () => {
    newMessage(newLine.user, newLine.message, new Date().toLocaleString())
      .then(() => {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Message Sent",
          life: 3000,
        });
      })
      .catch(() => {
        toast.current?.show({
          severity: "error",
          summary: "SignalR Error",
          detail: "SignalR Failed connection",
          life: 3000,
        });
      });
  };

  useEffect(() => {
    events((user, message, date) => {
      const updatedLine: Line = {
        id: "1",
        user: user,
        message: message,
        date: date,
      };

      settableData((prevTableData) => [...prevTableData, updatedLine]);
      settablerecoil((prevTableData) => [...prevTableData, updatedLine]);
      setNewLine((prevLine) => ({
        ...prevLine,
        message: "",
      }));
    });
  }, [events]);
  return (
    <div className="App">
      <Toast ref={toast} position="top-center" />
      <div>signalR component: {text}</div>
      <div>Character Count: {count} </div>
      <div>
        <DataTable value={tableData}>
          <Column field="user" header="User" sortable></Column>
          <Column field="message" header="Message" sortable></Column>
          <Column field="date" dataType="date" header="Date" sortable></Column>
        </DataTable>
      </div>

      <div>
        <InputText
          value={newLine.message}
          onChange={(e) =>
            setNewLine((prevLine) => ({
              ...prevLine,
              message: e.target.value,
            }))
          }
        />
        <Button label="Submit" onClick={sendMessage} />

        {tablerecoilVal.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </div>
      <Button
        icon="pi pi-times"
        className="p-button-rounded p-button-danger"
        aria-label="Cancel"
        onClick={() => (window.location.href = "http://localhost:3000")}
      />
    </div>
  );
};
export default SignalR;
