import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap' // import để render Modal bên dưới
import { emitter } from '../../utils/emitter';
import './ModalUser.scss';
class ModalUser extends Component {

    constructor(props) { // props là thuộc tính, là kế thừa những thuộc tính mà cha truyền vào
        super(props);
        // state là biến mà ta sẽ dùng trong component này
        this.state = {
            username: '',
            email: '',
            password: '',
            fullName: '',
            phoneNumber: '',
            dateOfBirth: '',
            gender: 'male',
            address: '',
            balance: '',
            status: 'active',
            role: 'user'
        }

        this.listenToEmitter();
    }
    listenToEmitter() { // hàm xử lí: clean hết dữ liệu ở modal cho lần mở tiếp
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => { // lắng nghe sự kiện
            // reset state
            this.setState({
                username: '',
                email: '',
                password: '',
                fullName: '',
                phoneNumber: '',
                dateOfBirth: '',
                gender: 'male',
                address: '',
                balance: '',
                status: 'active',
                role: 'user'
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
        let arrInput = ['username', 'email', 'password', 'fullName', 'phoneNumber', 'dateOfBirth', 'gender', 'address', 'balance', 'status', 'role'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        // Check username
        const usernameRegex = /^[a-zA-Z0-9]{5,11}$/;
        // độ dài tối thiểu 5 - tối đa 11 ký tự
        if (!usernameRegex.test(this.state.username)) {
            alert('Tên đăng nhập phải viết liền, không chứa ký tự đặc biệt và có độ dài từ 5 đến 11 ký tự!');
            return false;
        }
        // Check username trùng lặp
        if (this.props.arrUsers && this.props.arrUsers.some(user => user.username === this.state.username)) {
            alert('Tên đăng nhập này đã được sử dụng!');
            return false;
        }
        // Check password
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,16}$/;
        if (!passwordRegex.test(this.state.password)) {
            alert('Mật khẩu phải có độ dài từ 5 đến 16 ký tự, bao gồm ít nhất 1 chữ in hoa và 1 ký tự đặc biệt (!@#$%^&*)!');
            return false;
        }
        // Check fullName
        const fullNameWords = this.state.fullName.trim().split(/\s+/);
        const wordRegex = /^[A-ZÀ-Ỹ][a-zà-ỹ]+$/u;
        for (let word of fullNameWords) {
            if (!wordRegex.test(word)) {
                alert('Họ tên phải viết hoa chữ cái đầu và viết thường các chữ cái sau, có thể dùng tiếng Việt có dấu!');
                return false;
            }
        }
        // Check định dạng email bằng regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(this.state.email)) {
            alert('Email phải có định dạng @gmail.com!');
            return false;
        }
        // Check email trùng lặp
        if (this.props.arrUsers && this.props.arrUsers.some(user => user.email === this.state.email)) {
            alert('Email này đã được sử dụng!');
            return false;
        }
        // Check số điện thoại
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(this.state.phoneNumber)) {
            alert('Số điện thoại phải có 10 chữ số!');
            return false;
        }
        // Check số điện thoại trùng lặp
        if (this.props.arrUsers && this.props.arrUsers.some(user => user.phoneNumber === this.state.phoneNumber)) {
            alert('Số điện thoại này đã được sử dụng!');
            return false;
        }
        // Check tuổi phải trên 18
        const birthDate = new Date(this.state.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            alert('Người dùng phải từ 18 tuổi trở lên!');
            return false;
        }
        return isValid;
    }

    handleAddNewUser = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            try {
                let res = await this.props.createNewuser(this.state);
                if (res && res.errCode === 0) {
                    alert('Tạo user thành công!');
                } else {
                    alert(res && res.message ? res.message : 'Có lỗi xảy ra!');
                }
            } catch (error) {
                alert(error.message || 'Có lỗi xảy ra!');
            }
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
                            <label>User name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'username') }} value={this.state.username} />
                        </div>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type="email" onChange={(event) => { this.handleOnChangeInput(event, 'email') }} value={this.state.email} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(event) => { this.handleOnChangeInput(event, 'password') }} value={this.state.password} />
                        </div>
                        <div className='input-container'>
                            <label>Full name</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'fullName') }} value={this.state.fullName} />
                        </div>
                        <div className='input-container'>
                            <label>Phone number</label>
                            <input type='text' onChange={(event) => { this.handleOnChangeInput(event, 'phoneNumber') }} value={this.state.phoneNumber} />
                        </div>
                        <div className='input-container'>
                            <label>Date of birth</label>
                            <input type='date' onChange={(event) => { this.handleOnChangeInput(event, 'dateOfBirth') }} value={this.state.dateOfBirth} />
                        </div>
                        <div className='input-container'>
                            <label>Gender</label>
                            <select onChange={(event) => { this.handleOnChangeInput(event, 'gender') }} value={this.state.gender}>
                                <option value='male'>Nam</option>
                                <option value='female'>Nữ</option>
                                <option value='other'>Khác</option>
                            </select>
                        </div>
                        <div className='input-container'>
                            <label>Balance</label>
                            <input type='number' onChange={(event) => { this.handleOnChangeInput(event, 'balance') }} value={this.state.balance} />
                        </div>
                        <div className='input-container'>
                            <label>Status</label>
                            <select onChange={(event) => { this.handleOnChangeInput(event, 'status') }} value={this.state.status}>
                                <option value='active'>Active</option>
                                <option value='inactive'>Inactive</option>
                                <option value='banned'>Banned</option>
                            </select>
                        </div>
                        <div className='input-container'>
                            <label>Role</label>
                            <select onChange={(event) => { this.handleOnChangeInput(event, 'role') }} value={this.state.role}>
                                <option value='user'>User</option>
                                <option value='admin'>Admin</option>
                            </select>
                        </div>
                        <div className='input-container address-input max-width-input'>
                            <label>Address</label>
                            <textarea onChange={(event) => { this.handleOnChangeInput(event, 'address') }} value={this.state.address} />
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


