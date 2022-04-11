const User = [
    {
        name: "friends",
        path: "/friends",
        meta: {
          title: "社交",
        },
        component:  ()=> import('../../views/friends/FriendsPage.vue'),
    },
] 
export default User