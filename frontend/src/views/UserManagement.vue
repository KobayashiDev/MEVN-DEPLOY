<template>
  <div>
    <h1>List of users</h1>

   
    <input v-model="searchTerm" placeholder="Tìm kiếm theo tên hoặc email" />

    <table class="user-table">
      <thead>
        <tr>
          <th>Surname</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th colspan="2">Menu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user._id">
          <td>
            <input v-if="user.isEditing" v-model="user.firstName" />
            <span v-else>{{ user.firstName }}</span>
          </td>
          <td>
            <input v-if="user.isEditing" v-model="user.lastName" />
            <span v-else>{{ user.lastName }}</span>
          </td>
          <td>
            <input v-if="user.isEditing" v-model="user.email" />
            <span v-else>{{ user.email }}</span>
          </td>
          <td>
            <input v-if="user.isEditing" v-model="user.role" />
            <span v-else>{{ user.role }}</span>
          </td>
          <td>
            <button v-if="user.isEditing" @click.prevent="onSave(user)">Save</button>
            <button v-else @click.prevent="onEdit(user)">Edit</button>
          </td>
          <td>
            <button @click.prevent="onDelete(user._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      users: [], 
      searchTerm: "", 
    };
  },
  computed: {
    ...mapGetters(["authToken"]), 
    
    filteredUsers() {
      return this.users.filter((user) => {
        const searchTerm = this.searchTerm.toLowerCase();
        return (
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        );
      });
    },
  },
  created() {
    this.fetchUsers(); 
  },
  methods: {
    
    async fetchUsers() {
      try {
        const response = await axios.get("https://mevn-deploy-xp07.onrender.com/api/auth", {
          headers: {
            Authorization: `Bearer ${this.authToken}`, 
          },
        });
        this.users = response.data; 
      } catch (error) {
        console.error("Error loading user:", error);
      }
    },

    
    onEdit(user) {
      user.isEditing = true; 
    },

   
    async onSave(user) {
      try {
        
        await axios.put(
          `https://mevn-deploy-xp07.onrender.com/api/auth/${user._id}`,
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
          {
            headers: {
              Authorization: `Bearer ${this.authToken}`, 
            },
          }
        );

        user.isEditing = false; 
        alert("User updated successfully!");
      } catch (error) {
        console.error("Error while editing user:", error);
        alert("Unable to update user. Please try again.");
      }
    },

    
    async onDelete(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          
          await axios.delete(`https://mevn-deploy-xp07.onrender.com/api/auth/${userId}`, {
            headers: {
              Authorization: `Bearer ${this.authToken}`, 
            },
          });

         
          this.users = this.users.filter((user) => user._id !== userId);

          alert("User deleted successfully!");
        } catch (err) {
          console.error("Error while deleting user:", err);
          alert("Unable to delete user. Please try again.");
        }
      }
    },
  },
};
</script>

  
  
  <style scoped>
  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .user-table th, .user-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .user-table th {
    background-color: #f2f2f2;
  }
  </style>
  