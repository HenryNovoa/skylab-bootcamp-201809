import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            content:""
        };

       //this.toggle = this.toggle.bind(this);
    }

    componentWillReceiveProps(props){
        
        if (props.showModal !== undefined){
            this.setState({
                modal: props.showModal
            });
        }
    }

    handleOnChangeName = (ev) =>{

        this.setState({content:ev.target.value})
    }

    handleSubmitForm = () => {

        this.props.onEditPostit(this.state.content)
        this.setState({modal:false})
    }

    render() {
        return (
            <div>
                
                <Modal isOpen={this.state.modal} toggle={this.props.toggle} className={this.props.className}>
                    <ModalBody>
                        <form className="form-horizontal" onSubmit={(ev) => {ev.preventDefault(); this.handleSubmitForm()}}>
                            <div className="form-group">
                                <div className="col-sm-10">
                                    <input type="text" readOnly className="form-control" placeholder={"OldValue: " + this.props.oldmessage} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-10">
                                    <input value={this.state.content} onChange={(ev) => this.handleOnChangeName(ev)} type="text" className="form-control" id="inputEmail3" placeholder="Text..." />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" className="btn btn-default">Enviar</button>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ModalExample;