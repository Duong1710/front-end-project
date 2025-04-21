// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import * as actions from "../../store/actions";
// import Navigator from '../../components/Navigator';
// import { adminMenu } from './menuApp';
// import './Header.scss';

// class Header extends Component {

//     render() {
//         const { processLogout } = this.props;

//         return (
//             <div className="header-container">
//                 {/* thanh navigator */}
//                 <div className="header-tabs-container">
//                     <Navigator menus={adminMenu} />
//                 </div>

//                 {/* nút logout */}
//                 <div className="btn btn-logout" onClick={processLogout}>
//                     <i className="fas fa-sign-out-alt"></i>
//                 </div>
//             </div>
//         );
//     }

// }

// const mapStateToProps = state => {
//     return {
//         isLoggedIn: state.user.isLoggedIn
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         processLogout: () => dispatch(actions.processLogout()),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
// Header.js :contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

class Header extends Component {
    render() {
        const { processLogout } = this.props;

        return (
            <header className="header-container" role="banner">
                <nav
                    className="header-tabs-container"
                    role="navigation"
                    aria-label="Main menu"
                >
                    <Navigator menus={adminMenu} />
                </nav>
                <button
                    className="btn btn-logout"
                    onClick={processLogout}
                    aria-label="Đăng xuất"
                >
                    <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
                </button>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
    processLogout: () => dispatch(actions.processLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
