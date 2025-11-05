<template>
  <div class="page-container">
    <header>
      <h2>📚 Course List</h2>
      <!-- แสดงจำนวนคอร์สที่ถูกใจจาก store แบบเรียลไทม์ -->
      <p>❤️ ถูกใจแล้ว {{ favoriteStore.favorites.length }} คอร์ส</p>
    </header>

    <div class="form-section">
      <label>ชื่อผู้ใช้:</label>
      <!-- v-model username และอัปเดต store เมื่อมีการเปลี่ยนแปลง -->
      <input 
        v-model="username" 
        @input="updateUsername"
        placeholder="กรอกชื่อของคุณ" 
      />
    </div>

    <!-- แสดงลิงก์ไปหน้า Summary -->
    <div class="navigation-section">
      <RouterLink to="/summary" class="summary-link">
        📋 ไปหน้า Summary
      </RouterLink>
    </div>

    <div class="course-list">
      <!-- Render CourseCard สำหรับแต่ละคอร์ส -->
      <CourseCard 
        v-for="course in courses" 
        :key="course.id" 
        :course="course" 
      />
    </div>

    <!-- แสดงข้อความขณะโหลดข้อมูล -->
    <div v-if="loading" class="loading">
      🔄 กำลังโหลดข้อมูลคอร์ส...
    </div>

    <!-- แสดงข้อความเมื่อเกิดข้อผิดพลาด -->
    <div v-if="error" class="error">
      ❌ เกิดข้อผิดพลาดในการโหลดข้อมูล: {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import CourseCard from "../components/CourseCard.vue";
import axios from 'axios';
import { useFavoriteStore } from "../stores/favorite";

const courses = ref([]);
const username = ref('');
const loading = ref(false);
const error = ref('');

// ใช้ store เพื่อเข้าถึง username และ favorites
const favoriteStore = useFavoriteStore();

// ฟังก์ชันอัปเดตชื่อผู้ใช้ใน store
const updateUsername = () => {
  favoriteStore.setUsername(username.value);
};

// ฟังก์ชันดึงข้อมูลจาก API
const fetchCourses = async () => {
  try {
    loading.value = true;
    error.value = '';
    const response = await axios.get('https://fakestoreapi.com/products');
    courses.value = response.data;
  } catch (err) {
    error.value = 'ไม่สามารถโหลดข้อมูลคอร์สได้';
    console.error('Error fetching courses:', err);
  } finally {
    loading.value = false;
  }
};

// โหลดข้อมูลเมื่อ component ถูก mount
onMounted(() => {
  fetchCourses();
  // โหลดชื่อผู้ใช้จาก store (ถ้ามี)
  username.value = favoriteStore.username;
});
</script>

<style scoped>
.page-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

.form-section {
  margin: 20px 0;
}

.form-section label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.form-section input {
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.navigation-section {
  margin: 20px 0;
}

.summary-link {
  display: inline-block;
  background-color: #42b883;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
}

.summary-link:hover {
  background-color: #2c9c6d;
}

.course-list {
  margin-top: 24px;
  text-align: left;
}

.loading, .error {
  margin: 20px 0;
  padding: 15px;
  border-radius: 6px;
}

.loading {
  background-color: #e8f4fd;
  color: #1976d2;
}

.error {
  background-color: #ffeaa7;
  color: #d63031;
}
</style>
