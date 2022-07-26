const Modal = (props) => {
  return (
    <div className="modal-screen">
      <div className="modal-container">
        <div className ="content-container">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;