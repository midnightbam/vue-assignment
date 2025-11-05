import { defineStore } from 'pinia'
import { ref } from 'vue'

// Interface สำหรับ Course object
interface Course {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

// สร้าง store สำหรับจัดการข้อมูลโปรดและชื่อผู้ใช้
export const useFavoriteStore = defineStore('favorite', () => {
  // State: เก็บชื่อผู้ใช้และรายการคอร์สโปรด
  const username = ref<string>('')
  const favorites = ref<Course[]>([])

  // Action: เก็บชื่อผู้ใช้
  const setUsername = (name: string) => {
    username.value = name
  }

  // Action: เพิ่มคอร์สลงในรายการโปรด
  const addFavorite = (course: Course) => {
    favorites.value.push(course)
  }

  return {
    username,
    favorites,
    setUsername,
    addFavorite
  }
})
