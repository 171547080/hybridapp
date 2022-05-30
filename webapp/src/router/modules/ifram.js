const User = [
    {
        name: "parent",
        path: "/ifram/parent",
        meta: {
          title: "parent",
        },
        component:  ()=> import('../../views/ifram/parent.vue'),
    },
    {
      name: "children",
      path: "/ifram/children",
      meta: {
        title: "children2",
      },
      component:  ()=> import('../../views/ifram/children.vue'),
  },
  {
    name: "brother",
    path: "/ifram/brother",
    meta: {
      title: "brother",
    },
    component:  ()=> import('../../views/ifram/brother.vue'),
},
] 
export default User