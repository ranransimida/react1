import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'cart', ...(require('F:/A开课吧学习/react/umi-test/src/models/cart.js').default) });
app.model({ namespace: 'user', ...(require('F:/A开课吧学习/react/umi-test/src/models/user.js').default) });
app.model({ namespace: 'goods', ...(require('F:/A开课吧学习/react/umi-test/src/pages/goods/models/goods.js').default) });
