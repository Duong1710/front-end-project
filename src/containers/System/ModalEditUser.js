
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap' // import để render Modal bên dưới
import { emitter } from '../../utils/emitter';
import _ from 'lodash'; // giúp các hàm viết ngắn hơn gọn hơn js thuần
class ModalEditUser extends Component {

    constructor(props) { // props là thuộc tính, là kế thừa những thuộc tính mà cha truyền vào
        super(props);
        // state là biến mà ta sẽ dùng trong component này
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harshcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        // console.log('Didmount run: ', this.props.currentUser)
    }

    toggle = () => {
        this.props.toggleFromParent();
        // thêm dấu (): chạy hàm
        // không có dấu (): gọi ra hàm thôi, k chạy
    }

    handleOnChangeInput = (event, id) => {
        // good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value; // giá trị mà chúng ta nhập vào từng ô
        this.setState({ ...copyState })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        // Check định dạng email bằng regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.state.email)) {
            alert('Email is invalid!');
            return false;
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api edit modal
            this.props.editUser(this.state)
            // console.log(this.props) -> props là toàn bộ các câu lệnh, thuộc tính của thằng cha UserManage truyền sang cho ModalEditUser này
            // console.log('data modal ', this.state)
        }
    }

    render() {
        // console.log('check child props', this.props);
        // console.log('check child open modal', this.props.isOpen);
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
                    <b>Edit a new user</b>
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type="email" onChange={(event) => { this.handleOnChangeInput(event, 'email') }} value={this.state.email} disabled />
                            {/*thuộc tính disabled để ta k sửa dc email, password */}
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(event) => { this.handleOnChangeInput(event, 'password') }} value={this.state.password} disabled />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }} value={this.state.firstName} />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }} value={this.state.lastName} />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'address') }} value={this.state.address} />
                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


