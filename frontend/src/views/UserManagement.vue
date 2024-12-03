<template>
  <div>
    <h1>User List</h1>

    <!-- Search Box -->
    <input v-model="searchTerm" placeholder="Search by name or email" />

    <table class="user-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
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
      users: [], // Array to store user information
      searchTerm: "", // Variable to store the search keyword
    };
  },
  computed: {
    ...mapGetters(["authToken"]), // Get authToken from Vuex
    // Computed property to filter users based on search term
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
    this.fetchUsers(); // Fetch user data when the component is created
  },
  methods: {
    // Fetch user data from the server
    async fetchUsers() {
      try {
        const response = await axios.get("https://mevn-deploy-xp07.onrender.com/api/auth", {
          headers: {
            Authorization: `Bearer ${this.authToken}`, // Add token to the header
          },
        });
        this.users = response.data; // Assign the fetched data to the users array
      } catch (error) {
        console.error("Error loading users:", error);
      }
    },

    // Method to edit user information
    onEdit(user) {
      user.isEditing = true; // Mark the user as being edited
    },

    // Method to save edited user information
    async onSave(user) {
      try {
        // Send a PUT request to update user information
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
              Authorization: `Bearer ${this.authToken}`, // Add token to the header
            },
          }
        );

        user.isEditing = false; // Disable editing mode after saving
        alert("User updated successfully!");
      } catch (error) {
        console.error("Error editing user:", error);
        alert("Unable to update user. Please try again.");
      }
    },

    // Method to delete a user
    async onDelete(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          // Send a DELETE request to the server
          await axios.delete(`https://mevn-deploy-xp07.onrender.com/api/auth/${userId}`, {
            headers: {
              Authorization: `Bearer ${this.authToken}`, // Add token to the header
            },
          });

          // Update the user list immediately
          this.users = this.users.filter((user) => user._id !== userId);

          alert("User deleted successfully!");
        } catch (err) {
          console.error("Error deleting user:", err);
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
