<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '@/features/user'
import { type User } from '@/entities/user'

const toast = useToast()
const loading = ref(false)
const router = useRouter()
const { login } = useUser()

const form = reactive({
    email: '',
    password: '',
})

const validateEmail = (val: string) => /.+@.+\..+/.test(val)

const onSubmit = async () => {
    if (!validateEmail(form.email)) {
        toast.add({ title: 'Введите корректный email', color: 'error' })
        return
    }
    if (!form.password) {
        toast.add({ title: 'Введите пароль', color: 'error' })
        return
    }
    loading.value = true
    try {
        const user: User = await login({
            identifier: form.email,
            password: form.password,
        })
        toast.add({
            title: `Добро пожаловать, ${user.username}!`,
            color: 'primary',
            avatar: {
                src: user.avatar,
                alt: user.username,
                size: 'lg',
            },
        })
        await router.push('/map')
    } catch (e) {
        toast.add({ title: 'Ошибка аутентификации', color: 'error' })
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="flex items-center justify-center">
        <u-card
            :ui="{
                root: 'rounded-lg shadow-sm duration-200 border-0 w-full max-w-md',
                body: 'p-8 grid items-center justify-center',
            }"
        >
            <h2
                class="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100"
            >
                Вход в аккаунт
            </h2>
            <u-form :state="form" class="space-y-4" @submit="onSubmit">
                <u-form-field label="Email" name="email">
                    <u-input v-model="form.email" />
                </u-form-field>

                <u-form-field label="Password" name="password">
                    <u-input v-model="form.password" type="password" />
                </u-form-field>

                <u-button
                    loading-auto
                    type="submit"
                    class="inline-flex w-full justify-center"
                >
                    Войти
                </u-button>
            </u-form>
        </u-card>
    </div>
</template>
