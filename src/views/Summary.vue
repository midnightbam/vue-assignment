<template>
  <div class="page-container">
    <h2>📋 Summary</h2>
    
    <!-- แสดงข้อมูลหรือข้อความ fallback -->
    <div v-if="hasData" class="summary-data">
      <!-- ดึง username และ favorites.length จาก store -->
      <p><strong>ชื่อผู้ใช้:</strong> {{ favoriteStore.username }}</p>
      <p><strong>จำนวนคอร์สที่ถูกใจ:</strong> {{ favoriteStore.favorites.length }} คอร์ส</p>
      
      <!-- แสดงรายการคอร์สที่ถูกใจ (ถ้ามี) -->
      <div v-if="favoriteStore.favorites.length > 0" class="favorite-list">
        <h3>🎯 คอร์สที่คุณถูกใจ:</h3>
        <ul>
          <li v-for="course in favoriteStore.favorites" :key="course.id">
            {{ course.title }} - ${{ course.price }}
          </li>
        </ul>
      </div>
    </div>
    
    <!-- ข้อความเมื่อยังไม่มีข้อมูล -->
    <div v-else class="no-data">
      <p>❌ ยังไม่มีข้อมูลการเลือกคอร์ส</p>
      <p>กรุณากรอกชื่อและเลือกคอร์สที่ชอบก่อน</p>
    </div>

    <!-- ลิงก์กลับไปหน้า Course -->
    <div class="navigation-section">
      <RouterLink to="/" class="course-link">
        🏠 กลับไปหน้า Course
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useFavoriteStore } from '../stores/favorite';

// ใช้ store เพื่อเข้าถึงข้อมูล
const favoriteStore = useFavoriteStore();

// คำนวณว่ามีข้อมูลหรือไม่ (ต้องมีชื่อผู้ใช้และมีการเลือกคอร์สอย่างน้อย 1 คอร์ส)
const hasData = computed(() => {
  return favoriteStore.username.trim() !== '' || favoriteStore.favorites.length > 0;
});
</script>

<style scoped>
.page-container {
  text-align: center;
  padding: 40px 20px;
  max-width: 600px;
  margin: auto;
}

.summary-data {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.summary-data p {
  margin: 10px 0;
  font-size: 16px;
  color: #000000;
}

.favorite-list {
  margin-top: 20px;
  text-align: left;
}

.favorite-list h3 {
  text-align: center;
  color: #42b883;
  margin-bottom: 15px;
}

.favorite-list ul {
  list-style-type: none;
  padding: 0;
}

.favorite-list li {
  background-color: white;
  padding: 10px;
  margin: 8px 0;
  border-radius: 6px;
  border-left: 4px solid #42b883;
  color: #000000;
  font-weight: 500;
}

.no-data {
  background-color: #fff3cd;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  color: #856404;
}

.navigation-section {
  margin-top: 30px;
}

.course-link {
  display: inline-block;
  background-color: #42b883;
  color: white;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
}

.course-link:hover {
  background-color: #2c9c6d;
}
</style>
