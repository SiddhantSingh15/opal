import React from "react";
import Modal from "react-modal"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import "./DocumentView.css"

Modal.setAppElement("#root");


class DocumentView extends React.Component {

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				onRequestClose={this.props.toggleModal}
				overlayClassName="myoverlay"
				contentLabel="My dialog"
				className="viewer-modal">
				<CloseIcon className="icon" onClick={this.props.toggleModal}/>
				<iframe
					title="documentPreview"
				 	className="document" 
					src ={this.props.currentDocument}/>
			</Modal>
		)
	}
}

export default DocumentView;