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
/* Container styling */
.change-password {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  text-align: center;
}

/* Heading styling */
.change-password h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* Form styling */
.change-password form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Label styling */
.change-password label {
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

/* Input field styling */
.change-password input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

/* Input focus effect */
.change-password input[type="password"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Button styling */
.change-password button {
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Button hover effect */
.change-password button:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

/* Button active effect */
.change-password button:active {
  background-color: #004494;
}

/* Error message styling */
.change-password .error {
  margin-top: 10px;
  font-size: 14px;
  color: red;
  font-weight: bold;
  text-align: left;
}

/* Responsive Design */
@media (max-width: 500px) {
  .change-password {
    padding: 15px;
  }

  .change-password h3 {
    font-size: 20px;
  }

  .change-password button {
    font-size: 14px;
    padding: 10px;
  }
}
</style>

