
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap' // import để render Modal bên dưới

class ModalUser extends Component {

    constructor(props) { // props là thuộc tính
        super(props);
        // state là biến mà ta sẽ dùng trong component này
        this.state = {

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
        // thêm dấu (): chạy hàm
        // không có dấu (): gọi ra hàm thôi, k chạy
    }
    render() {
        console.log('check child props', this.props);
        console.log('check child open modal', this.props.isOpen);
        // this.props.isOpen là thuộc tính con kế thừa từ thuộc tính cha trong file UserManage.js
        // isOpen={this.props.isOpen} (= true là mở Modal, = false là chưa mở Modal)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
                centered

            >
                {/* isOpen={this.props.isOpen} (= true là mở Modal, = false là chưa mở Modal) */}
                <ModalHeader toggle={() => { this.toggle() }}>
                    <b>Create a new user</b>
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text' />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='text' />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' />
                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.toggle() }}>
                        Save changes
                    </Button> {' '}
                    <Button variant="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




