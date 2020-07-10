import axios from 'axios';

export const state = () => ({
  list: [],
});

export const getters = {
  getData: (state) => {
    return state.list;
  }
};

export const mutations = {
  setData: (state, { list }) => {
    state.list = [];
    list.forEach(item => {
      state.list.push({
        id: item[0].value,
        name: item[1].value,
        age: item[2].value,
        phone: item[3].value,
        email: item[4].value,
        isEdit: false
      });
    });
  },
  setItemEditable: (state, item) => {
    const foundItem = state.list.find(el => el.id === item.id);
    foundItem.isEdit = true;
  },
  saveItem: (state, item) => {
    const foundItem = state.list.find(el => el.id === item.id);
    foundItem.name = item.name;
    foundItem.age = item.age;
    foundItem.phone = item.phone;
    foundItem.email = item.email;
    foundItem.isEdit = false;
  },
  addItem: (state, payload) => {
    let id;
    if (state.list.length) {
      const itemWithMaxIndex = state.list.reduce((prev, current) => (+prev.id > +current.id) ? prev : current);
      id = itemWithMaxIndex.id + 1;
    } else {
      id = 0;
    }
    state.list.push({
      id,
      name: payload.name,
      age: payload.age,
      phone: payload.phone,
      email: payload.email,
      isEdit: false
    });
  },
  deleteItem: (state, item) => {
    const foundIndex = state.list.findIndex(el => el.id === item.id);
    state.list.splice(foundIndex, 1);
  },
  sortItems: (state, field) => {
    state.list.sort( (a,b) => ('' + a[field]).localeCompare(b[field]));
  }
};

export const actions = {
  getData: ({ commit }, payload) => {
    return axios
      .get(process.env.API_URL)
      .then((response) => {
        return commit('setData', { list: response.data });
      });
  },
  setItemEditable: ( { commit }, payload) => {
    return commit('setItemEditable', payload.item)
  },
  saveItem: ({ commit }, payload) => {
    return axios(
      {
        url: process.env.API_URL,
        method: 'post',
        data: {
          id: payload.id,
          name: payload.name,
          age: payload.age,
          phone: payload.phone,
          email: payload.email,
        }
      })
      .then((response) => {
        return commit('saveItem', payload);
      });
  },
  deleteItem: ({ commit }, payload) => {
    return axios.post(
      process.env.API_URL,
      {
        data: {
            method: 'delete',
            id: payload.id
          }
      })
      .then((response) => {
        return commit('deleteItem', payload);
      });
  },
  addItem: ({ commit }, payload) => {
    return axios(
      {
        url: process.env.API_URL,
        method: 'post',
        data: {
          method: 'add',
          name: payload.name,
          age: payload.age,
          phone: payload.phone,
          email: payload.email,
        }
      })
      .then((response) => {
        return commit('addItem', payload);
      });
  },
  sortItems: ( { commit }, payload) => {
    commit('sortItems', payload.field);
  }
};
