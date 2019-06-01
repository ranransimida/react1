export default {
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true
      }
    ]
  ],
  routes: [
    { path: "/login", component: "./login" },
    {
      path: "/",
      component: "../layouts",  // 路径相对于pages
      routes: [
        { path: "/", component: "./goods/index" },
        {
          path: "/about",
          component: "./about",
          Routes: ["./routes/PrivateRoute.js"]  // 路由守卫
        },
        {
          path: "/users",
          component: "./users/_layout",
          routes: [
            { path: "/users/", component: "./users/index" },
            { path: "/users/:id", component: "./users/$id" },
            {
              component: "./404"
            }
          ]
        },
        {
          component: "./404"
        }
      ]
    }
  ]
};
