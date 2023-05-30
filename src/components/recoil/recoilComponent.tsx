import { Button } from "primereact/button";
import React from "react";
import { atom, useRecoilState } from "recoil";
import { textState } from "./recoilAtom";

const RecoilComponent = () => {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event: {
    target: { value: string | ((currVal: string) => string) };
  }) => {
    setText(event.target.value);
  };

  return (
    <div>
      recoil component: {text}
      <div>
        <input type="text" value={text} onChange={onChange} />
      </div>
    </div>
  );
};

export default RecoilComponent;
