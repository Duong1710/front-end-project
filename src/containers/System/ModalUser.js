
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap' // import để render Modal bên dưới
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) { // props là thuộc tính, là kế thừa những thuộc tính mà cha truyền vào
        super(props);
        // state là biến mà ta sẽ dùng trong component này
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenToEmitter();
    }
    listenToEmitter() { // hàm xử lí: clean hết dữ liệu ở modal cho lần mở tiếp
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => { // lắng nghe sự kiện
            // reset state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }
    componentDidMount() {

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
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api create modal
            // console.log(this.props) -> props là toàn bộ các câu lệnh của thằng cha UserManage truyền sang cho ModalUser này
            this.props.createNewuser(this.state)
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
                    <b>Create a new user</b>
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type="email" onChange={(event) => { this.handleOnChangeInput(event, 'email') }} value={this.state.email} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(event) => { this.handleOnChangeInput(event, 'password') }} value={this.state.password} />
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
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>
                        Add new
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


