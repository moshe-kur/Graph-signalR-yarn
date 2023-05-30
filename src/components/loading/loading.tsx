import { ProgressSpinner } from "primereact/progressspinner";

const Loading = () => {
  return (
    <div className="App loading">
      <div className="card flex justify-content-center">
        <ProgressSpinner />
      </div>
    </div>
  );
};

export default Loading;

//
