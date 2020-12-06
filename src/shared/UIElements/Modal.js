import React from "react";

import { CSSTransition } from "react-transition-group";


// import './Modal.css';

const ModalOverlay = (props) => {
  // const content = (
  //   <div className={`modal ${props.className}`} style={props.style}>
  //     <header className={`modal__header ${props.headerClass}`}>
  //       <h2>{props.header}</h2>
  //     </header>
  //     <form
  //       onSubmit={
  //         props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
  //       }
  //     >
  //       <div className={`modal__content ${props.contentClass}`}>
  //         {props.children}
  //       </div>
  //       <footer className={`modal__footer ${props.footerClass}`}>
  //         {props.footer}
  //       </footer>
  //     </form>
  //   </div>
  // );
  // return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
  // <div className="modal-hook" tabindex="-1" role="dialog">
  //     <div className="modal-dialog" role="document">
  //       <div className="modal-content">
  //         <div className="modal-header">
  //           <h5 className="modal-title">Modal title</h5>
  //           <button
  //             type="button"
  //             className="close"
  //             data-dismiss="modal"
  //             aria-label="Close"
  //           >
  //             <span aria-hidden="true">&times;</span>
  //           </button>
  //         </div>
  //         <div className="modal-body">
  //           <p>{props.error}</p>
  //         </div>
  //         <div className="modal-footer">
  //           <button
  //             type="button"
  //             className="btn btn-secondary"
  //             data-dismiss="modal"
  //             onClick={props.onCancle}
  //           >
  //             Close
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  return (
    <React.Fragment>
      <br/><br/><br/><br/><br/>
      <div className="modal-hook">
      <p style={{textAlign:"center", color:"red"}}>{props.error}</p>
    </div>
    </React.Fragment>
  )
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {/* {props.show && <Backdrop onClick={props.onCancel} />} */}
      {props.show}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>

    </React.Fragment>
  );
};

export default Modal;
