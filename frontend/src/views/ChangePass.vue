<template>
  <div class="change-password">
    <h3>Change Password</h3>
    <form @submit.prevent="submitChangePassword">
      <div>
        <label for="oldPassword">Old Password:</label>
        <input type="password" id="oldPassword" v-model="oldPassword" required />
      </div>
      <div>
        <label for="newPassword">New Password:</label>
        <input type="password" id="newPassword" v-model="newPassword" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit">Change Password</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
data() {
  return {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    errorMessage: "", // Store error message
  };
},
computed: {
  ...mapGetters(["authToken"]),
},
methods: {
  async submitChangePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = "New password and confirmation do not match.";
      return;
    }

    try {
      this.errorMessage = ""; // Clear previous errors if any
      await axios.post(
        "https://mevn-deploy-xp07.onrender.com/api/auth/change",
        {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );
      alert("Password changed successfully!");
      this.$router.push("/profile"); // Redirect to profile page
    } catch (err) {
      console.error("Error changing password:", err.response?.data?.message || err.message);
      this.errorMessage = err.response?.data?.message || "Failed to change password. Please try again.";
    }
  },
},
};
</script>

<style scoped>
.change-password {
max-width: 400px;
margin: 0 auto;
}
form div {
margin-bottom: 10px;
}
</style>
