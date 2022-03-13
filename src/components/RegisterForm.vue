<template>
  <form @submit.prevent="submit()" class="form">
    <input
      type="text"
      placeholder="Name"
      v-model="formData.name"
      class="input"
    />
    <input
      type="text"
      placeholder="Email"
      v-model="formData.email"
      class="input"
    />
    <input
      type="password"
      placeholder="Password"
      v-model="formData.password"
      class="input"
    />
    <input type="submit" value="Register" class="submit" />
  </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue"
import axios, { AxiosResponse } from "axios"

export default defineComponent({
  setup() {
    const formData = reactive({
      name: "",
      email: "",
      password: "",
    })
    const submit = () => {
      axios({
        method: "post",
        url: "http://boomering-api.test/api/auth/register",
        data: formData,
      }).finally(() => {
        formData.name = ""
        formData.email = ""
        formData.password = ""
        setTimeout(() => {
          getRandomFormdata()
        }, 3000)
      })
    }
    const getRandomFormdata = () => {
      axios({
        method: "get",
        url: "http://boomering-api.test/api/random",
        data: formData,
      }).then((response: AxiosResponse) => {
        formData.name = response.data.name
        formData.email = response.data.email
        formData.password = response.data.password
      })
    }
    onMounted(() => {
      getRandomFormdata()
    })
    return {
      formData,
      submit,
    }
  },
})
</script>

<style lang="scss" scoped>
.form {
  @apply flex flex-col items-center justify-center h-screen w-1/2 space-y-6 bg-indigo-800;
}

.input {
  @apply appearance-none focus:outline-none px-4 py-3 w-1/2 ring-2 ring-indigo-800 rounded focus:ring-indigo-400;
}

.submit {
  @extend .input;
  @apply text-white cursor-pointer ring-white hover:bg-indigo-900 hover:ring-indigo-900;
}
</style>
