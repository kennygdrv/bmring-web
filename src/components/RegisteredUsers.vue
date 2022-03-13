<template>
  <ul class="h-screen max-h-screen overflow-y-scroll w-1/2 space-y-6 p-6">
    <li
      v-for="user in filteredUsers"
      :key="user.id"
      class="px-4 py-3 ring ring-indigo-800"
    >
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Registered: {{ user.created_at }}</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue"
import axios, { AxiosResponse } from "axios"
import Pusher from "pusher-js"

export default defineComponent({
  setup() {
    // Users
    type User = {
      id: string
      name: string
      email: string
      created_at: string
      updated_at: string
    }
    const users: User[] = reactive([])
    const filteredUsers = computed(() => users.slice(0, 100))

    // Pusher
    const pusher = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
      cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
    })
    const channel = pusher.subscribe(process.env.VUE_APP_CHANNEL)
    channel.bind(process.env.VUE_APP_EVENT, (data: { user: User }) => {
      users.unshift(data.user)
    })

    const getUsers = () => {
      axios({
        method: "get",
        url: "http://boomering-api.test/api/users",
      }).then((response: AxiosResponse) => {
        users.push(...response.data)
      })
    }

    onMounted(() => {
      getUsers()
    })

    return {
      users,
      filteredUsers,
    }
  },
})
</script>

<style lang="scss" scoped></style>
