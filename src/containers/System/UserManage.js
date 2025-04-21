import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {
    /** Luồng chạy của basic nhất của react
        * 1.Run construct => init state: khởi tạo biến
        * 2.Run DidMount (set state): Gọi API, lấy giá trị vào và set state, state lưu trữ lại giá trị các biến => render lấy dữ liệu state để in ra màn hình
        * 3.Render ra giao diện
        * 
        */
    constructor(props) { // props là thuộc tính
        super(props);
        // state là biến mà ta sẽ dùng trong component này
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }
    // Các hàm xử lí sự kiện
    handleAddNewUser = () => { // mở modal
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser, // tắt Modal
        })
    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL'); // id  === ALL thì sẽ lấy được hết thông tin người dùng
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users // nếu console.log(response) ra thì sẽ thấy có users, ta chấm vào để gọi tất cả thông tin người dùng ra
            }) // Hàm này để lưu biến (state)
        }
        // console.log('get user from node js: ', response)
    }

    createNewuser = async (data) => { // Hàm này đã được xử lí bằng hàm handleAddNewUser bên ModalUser
        try {
            let response = await createNewUserService(data); // gọi api đến hàm thêm người dùng ở BE
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            }
            else {
                await this.getAllUsersFromReact();
                this.toggleUserModal(); // tắt modal
                emitter.emit('EVENT_CLEAR_MODAL_DATA'); //khởi tạo sự kiện: xóa hết dữ liệu ở modal để clean cho lần mở tiếp
            }

        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            }
            else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        // Đã có bootstrap, fontawesome nên dùng các class của bootstrap luôn
        // Dùng table của react cho đẹp
        let arrUsers = this.state.arrUsers;
        // properties ; nested
        return (
            <div className="users-container">
                <ModalUser
                    // import thuộc tính tới file ModalUser.js
                    isOpen={this.state.isOpenModalUser} // import thuộc tính isOpen cho ModalUser.js
                    toggleFromParent={this.toggleUserModal}
                    createNewuser={this.createNewuser}
                />
                <div className='title text-center'>Manage users with Dương</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-2'
                        onClick={() => this.handleAddNewUser()} // mở ra modaluser khi click
                    ><i className="fas fa-plus"></i>  Add new Users</button>
                </div>
                <div className='users-table mt-3 mx-1' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    {/*style={{ maxHeight: '80vh', overflowY: 'auto' }} : thuộc tính/ tạo ra thanh cuộn cho bảng */}
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => { // truyền giá trị của biến (từng user) vào bảng
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
