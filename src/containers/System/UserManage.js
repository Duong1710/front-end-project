import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService';
class UserManage extends Component {
    /** Luồng chạy của basic nhất của react
        * 1.Run construct => init state: khởi tạo biến
        * 2.Run DidMount (set state): Gọi API, lấy giá trị vào và set state, state lưu trữ lại giá trị các biến => render lấy dữ liệu state để in ra màn hình
        * 3.Render ra giao diện
        * 
        */
    constructor(props) {
        super(props);
        // state là biến mà ta sẽ dùng trong component này
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL'); // id  === ALL thì sẽ lấy được hết thông tin người dùng
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users // nếu console.log(response) ra thì sẽ thấy có users, ta chấm vào để gọi tất cả thông tin người dùng ra
            }) // Hàm này để lưu biến (state)
        }
        // console.log('get user from node js: ', response)
    }

    render() {
        // Đã có bootstrap, fontawesome nên dùng các class của bootstrap luôn
        // Dùng table của react cho đẹp
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className='title text-center'>Manage users with Dương</div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) => { // truyền giá trị của biến (từng user) vào bảng
                            console.log("Eric check", item, index)
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i class="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        }
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
