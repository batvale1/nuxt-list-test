<template>
  <div class="personal-data-sheet">
    <table class="personal-data-sheet__table">
      <thead>
      <tr class="personal-data-sheet__table-row">
        <th class="personal-data-sheet__table-column-header" @click="sortBy('name')">Name</th>
        <th class="personal-data-sheet__table-column-header" @click="sortBy('age')">Age</th>
        <th class="personal-data-sheet__table-column-header" @click="sortBy('phone')">Phone</th>
        <th class="personal-data-sheet__table-column-header" @click="sortBy('email')">E-mail</th>
        <th class="personal-data-sheet__table-column-header"></th>
        <th class="personal-data-sheet__table-column-header"></th>
      </tr>
      </thead>
      <tbody>
      <tr class="personal-data-sheet__new-item">
       <td>
          <input
            type="text"
            v-model="newName"
          >
        </td>
        <td>
          <input
            type="number"
            v-model="newAge"
          >
        </td>
        <td>
          <input
            type="text"
            v-model="newPhone"
          >
        </td>
        <td>
          <input
            type="text"
            v-model="newEmail"
          >
        </td>
        <td class="personal-data-sheet__data"><app-button @click.native="addItem">Add</app-button></td>
      </tr>
      <tr v-for="item in data" :key="item.id">
        <td>
          <p v-if="!item.isEdit"> {{ item.name }}</p>
          <input
            v-else
            type="text"
            v-model="name"
          >
        </td>
        <td>
          <p v-if="!item.isEdit"> {{ item.age }}</p>
          <input
            v-else
            type="text"
            v-model="age"
          >
        </td>
        <td>
          <p v-if="!item.isEdit"> {{ item.phone }}</p>
          <input
            v-else
            type="text"
            v-model="phone"
          >
        </td>
        <td>
          <p v-if="!item.isEdit"> {{ item.email }}</p>
          <input
            v-else
            type="text"
            v-model="email"
          >
        </td>
        <td class="personal-data-sheet__data"><app-button @click.native="editRow(item)">{{ item.isEdit ? 'Save' : 'Edit'}}</app-button></td>
        <td class="personal-data-sheet__data"><app-button @click.native="deleteItem(item)">Delete</app-button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Button from "./ui/Button";
  export default {
    data() {
      return {
        name: '',
        age: 0,
        phone: '',
        email: '',
        newName: '',
        newAge: '',
        newPhone: '',
        newEmail: '',
      }
    },
    computed: {
      data() {
        return this.$store.getters['personal-data/getData'];
      }
    },
    methods: {
      editRow(item) {
        if (!item.isEdit) {
          this.name = item.name;
          this.age = item.age;
          this.phone = item.phone;
          this.email = item.email;
          this.$store.dispatch('personal-data/setItemEditable', { item });
        } else {
          this.$store.dispatch('personal-data/saveItem', { id: item.id, name: this.name, age: this.age, phone: this.phone, email: this.email })
            .catch(error => {
              console.log(error);
            });
        }
      },
      deleteItem(item) {
        this.$store.dispatch('personal-data/deleteItem', { id: item.id })
          .catch(error => {
            console.log(error);
          });
      },
      addItem() {
        this.$store.dispatch('personal-data/addItem', { name: this.newName, age: this.newAge, phone: this.newPhone, email: this.newEmail })
          .catch(error => {
            console.log(error);
          });
      },
      sortBy(field) {
        this.$store.dispatch('personal-data/sortItems', { field });
      }
    },
    components: {
      'app-button': Button
    }
  }
</script>

<style scoped>
  .personal-data-sheet {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .personal-data-sheet__table {
    border-collapse: collapse;
    text-align: left;
    width: 100%;
    min-width: 800px;
  }
  .personal-data-sheet__table-row {
    background: white;
    border-bottom: 1px solid
  }
  .personal-data-sheet__table-column-header {
    padding: 10px 20px;
  }

  .personal-data-sheet__data {
    padding: 10px 20px;
  }

  .personal-data-sheet__new-item {
    border-bottom: 1px dashed grey;
  }

</style>
