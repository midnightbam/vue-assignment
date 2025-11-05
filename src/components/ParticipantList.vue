<script setup>
import { ref } from "vue";

// 1. ประกาศตัวแปร name มีค่าเริ่มต้นเป็น ""
const name = ref("");

// 2. ประกาศตัวแปร participants เป็น Array เปล่าสำหรับเก็บค่า input name
const participants = ref([]);

// 3. สร้างฟังก์ชันสำหรับเพิ่ม name เข้า participants ตอนที่กดปุ่ม
const addParticipant = () => {
  // ตรวจสอบว่า name ไม่ใช่ค่าว่าง
  if (name.value.trim() !== "") {
    // เพิ่มชื่อเข้าไปใน participants
    participants.value.push(name.value.trim());
    // ล้างค่า input
    name.value = "";
  }
};
</script>

<template>
  <div class="assignment-container">
    <h2>รายชื่อผู้เข้าร่วมกิจกรรม</h2>
    <!-- 4. ใช้ v-model เพื่อเก็บค่า input -->
    <input 
      v-model="name" 
      placeholder="กรอกชื่อผู้เข้าร่วม" 
      @keyup.enter="addParticipant"
      type="text"
    />
    <!-- 5. ใช้ @click เพื่อเรียกใช้ addParticipant ตอนกดปุ่ม -->
    <button @click="addParticipant">เพิ่มชื่อ</button>
    <div class="participant-list">
      <!-- 6. เขียน v-if เพื่อแสดงข้อความ "ยังไม่มีผู้เข้าร่วม" เมื่อไม่มีสมาชิกใน participants -->
      <p v-if="participants.length === 0">ยังไม่มีผู้เข้าร่วม</p>
      <!-- 7. เขียน v-else เพื่อแสดง <li> ถ้ามีสมาชิกใน participants -->
      <ul v-else>
        <!-- 8. เขียน v-for เพื่อลูปและแสดงรายชื่อทั้งหมดใน participants -->
        <li v-for="(participant, index) in participants" :key="index">
          {{ participant }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.assignment-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  background: #f9f9f9;
  color: #333;
}

h2 {
  margin-bottom: 15px;
  color: #1a1a1a;
}

input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #1a1a1a;
  background: white;
}

button {
  margin-left: 8px;
  padding: 8px 16px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #333;
}

.participant-list {
  margin-top: 20px;
}

.participant-list p {
  color: #666;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

li {
  margin: 8px 0;
  color: #1a1a1a;
}
</style>