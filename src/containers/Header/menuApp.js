// export const adminMenu = [
//     { //hệ thống
//         name: 'menu.system.header', menus: [
//             {
//                 name: 'menu.system.system-administrator.header',
//                 subMenus: [
//                     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
//                     { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
//                     { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
//                 ]
//             },
//             // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
//         ]
//     },
// ];

// menuApp.js :contentReference[oaicite:6]{index=6}&#8203;:contentReference[oaicite:7]{index=7}
export const adminMenu = [
    {
        name: 'menu.system.header',
        menus: [
            {
                name: 'menu.system.system-administrator.header',
                subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
                    { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                ],
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ],
    },
];