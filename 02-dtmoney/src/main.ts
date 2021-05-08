import Vue from 'vue';
import { createServer, Model } from 'miragejs';
import Modal from 'vue-js-modal';
import App from './App.vue';
import store from './store';

import './styles/global.scss';

Vue.config.productionTip = false;

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-14 10:00:00'),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => this.schema.all('transaction'));

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  },
});

Vue.use(Modal, { componentName: 'Modal' });

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
