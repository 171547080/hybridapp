const User = [
    {
        name: "product",
        path: "/product",
        meta: {
          title: "产品",
        },
        component:  ()=> import('../../views/product/ProductPage.vue'),
    },
] 
export default User