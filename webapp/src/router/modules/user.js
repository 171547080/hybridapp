const User = [
    {
        name: "user",
        path: "/user",
        meta: {
          title: "个人中心",
        },
        component:  ()=> import('../../views/user/UserPage.vue'),
    },
] 
export default User