<template>
  <div>
    <h1>Danh sách người dùng</h1>

    <!-- Ô tìm kiếm -->
    <input v-model="searchTerm" placeholder="Tìm kiếm theo tên hoặc email" />

    <table class="user-table">
      <thead>
        <tr>
          <th>Họ</th>
          <th>Tên</th>
          <th>Email</th>
          <th>Vai trò</th>
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
            <button v-if="user.isEditing" @click.prevent="onSave(user)">Lưu</button>
            <button v-else @click.prevent="onEdit(user)">Sửa</button>
          </td>
          <td>
            <button @click.prevent="onDelete(user._id)">Xóa</button>
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
      users: [], // Mảng chứa thông tin người dùng
      searchTerm: "", // Biến chứa từ khóa tìm kiếm
    };
  },
  computed: {
    ...mapGetters(["authToken"]), // Lấy authToken từ Vuex
    // Computed property để lọc người dùng theo từ khóa tìm kiếm
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
    this.fetchUsers(); // Lấy dữ liệu người dùng khi component được tạo
  },
  methods: {
    // Lấy dữ liệu người dùng từ server
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5000/api/auth", {
          headers: {
            Authorization: `Bearer ${this.authToken}`, // Thêm token vào header
          },
        });
        this.users = response.data; // Gán dữ liệu vào mảng users
      } catch (error) {
        console.error("Lỗi khi tải người dùng:", error);
      }
    },

    // Hàm để sửa thông tin người dùng
    onEdit(user) {
      user.isEditing = true; // Đánh dấu người dùng là đang được chỉnh sửa
    },

    // Hàm để lưu thông tin người dùng đã sửa
    async onSave(user) {
      try {
        // Gửi yêu cầu PUT để sửa thông tin người dùng
        await axios.put(
          `http://localhost:5000/api/auth/${user._id}`,
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
          {
            headers: {
              Authorization: `Bearer ${this.authToken}`, // Thêm token vào header
            },
          }
        );

        user.isEditing = false; // Tắt chế độ chỉnh sửa sau khi lưu
        alert("Cập nhật người dùng thành công!");
      } catch (error) {
        console.error("Lỗi khi sửa người dùng:", error);
        alert("Không thể cập nhật người dùng. Vui lòng thử lại.");
      }
    },

    // Hàm để xóa người dùng
    async onDelete(userId) {
      if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
        try {
          // Gửi yêu cầu DELETE tới server
          await axios.delete(`http://localhost:5000/api/auth/${userId}`, {
            headers: {
              Authorization: `Bearer ${this.authToken}`, // Thêm token vào header
            },
          });

          // Cập nhật danh sách người dùng ngay lập tức
          this.users = this.users.filter((user) => user._id !== userId);

          alert("Đã xóa người dùng thành công!");
        } catch (err) {
          console.error("Lỗi khi xóa người dùng:", err);
          alert("Không thể xóa người dùng. Vui lòng thử lại.");
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
  