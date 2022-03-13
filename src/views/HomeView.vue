<template>
  <div class="flex h-screen">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <RegisterForm />
    <RegisteredUsers />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import RegisterForm from "@/components/RegisterForm.vue" // @ is an alias to /src
import RegisteredUsers from "@/components/RegisteredUsers.vue" // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    RegisterForm,
    RegisteredUsers,
  },
})
</script>
