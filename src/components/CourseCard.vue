<template>
  <div class="course-card">
    <!-- แสดงชื่อคอร์สและราคา -->
    <h3>ชื่อคอร์ส: {{ course.title }}</h3>
    <p>ราคา: ${{ course.price }}</p>
    <!-- ปุ่มเพิ่มในรายการโปรด - เปิดใช้งานเมื่อมีชื่อผู้ใช้เท่านั้น -->
    <button 
      @click="handleAddFavorite" 
      :disabled="!canAddFavorite"
      :class="{ disabled: !canAddFavorite }"
    >
      เพิ่มในรายการโปรด
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFavoriteStore } from '../stores/favorite'

// รับ props course object จาก parent component
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})

// ใช้ store เพื่อเข้าถึงข้อมูลและฟังก์ชัน
const favoriteStore = useFavoriteStore()

// คำนวณว่าสามารถเพิ่มในรายการโปรดได้หรือไม่ (ต้องมีชื่อผู้ใช้)
const canAddFavorite = computed(() => {
  return favoriteStore.username.trim() !== ''
})

// ฟังก์ชันเพื่อเพิ่มคอร์สในรายการโปรด
const handleAddFavorite = () => {
  if (canAddFavorite.value) {
    favoriteStore.addFavorite(props.course)
  }
}
</script>

<style scoped>
.course-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
  padding: 12px 16px;
  margin-bottom: 16px;
}

h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  flex: 1;
  text-align: left;
  color: #000000;
}

p {
  margin: 0;
  color: #555;
  flex: 0 0 auto;
  margin-right: 16px;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  flex: 0 0 auto;
}

button:hover:not(.disabled) {
  background-color: #2c9c6d;
}

button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
