<template>
  <AuthShell>
    <AuthLogo />

    <AuthHeader
      :title="pageTitle"
      :description="pageDescription"
    />

    <form
      v-if="isSignIn"
      class="auth-form"
      novalidate
      @submit.prevent="submitSignIn"
    >
      <input
        v-model.trim="signInForm.login"
        class="auth-input"
        type="text"
        autocomplete="username"
        placeholder="Логин или телефон"
        autofocus
      />

      <AuthPasswordField
        v-model="signInForm.password"
        autocomplete="current-password"
        placeholder="Пароль"
      />

      <button
        class="auth-btn"
        type="submit"
        :disabled="!canSignIn"
      >
        Войти
      </button>
    </form>

    <form
      v-else-if="step === SIGN_UP_STEPS.PHONE"
      class="auth-form"
      novalidate
      @submit.prevent="nextStep"
    >
      <input
        v-model.trim="signUpForm.phone"
        class="auth-input"
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        placeholder="Телефон"
        autofocus
      />

      <button
        class="auth-btn"
        type="submit"
        :disabled="!canGoToNickname"
      >
        Далее
      </button>
    </form>

    <form
      v-else-if="step === SIGN_UP_STEPS.NICKNAME"
      class="auth-form"
      novalidate
      @submit.prevent="nextStep"
    >
      <input
        v-model.trim="signUpForm.nickname"
        class="auth-input"
        type="text"
        autocomplete="username"
        placeholder="Никнейм"
        autofocus
      />

      <div v-if="normalizedNickname" class="auth-preview">
        @{{ normalizedNickname }}
      </div>

      <div class="auth-actions">
        <button
          class="auth-back-btn"
          type="button"
          @click="prevStep"
        >
          Назад
        </button>

        <button
          class="auth-btn"
          type="submit"
          :disabled="!canGoToPassword"
        >
          Далее
        </button>
      </div>
    </form>

    <form
      v-else
      class="auth-form"
      novalidate
      @submit.prevent="submitSignUp"
    >
      <AuthPasswordField
        v-model="signUpForm.password"
        autocomplete="new-password"
        placeholder="Пароль"
      />

      <AuthPasswordField
        v-model="signUpForm.password_confirm"
        autocomplete="new-password"
        placeholder="Подтвердите пароль"
      />

      <p v-if="passwordError" class="auth-error">
        {{ passwordError }}
      </p>

      <div class="auth-actions">
        <button
          class="auth-back-btn"
          type="button"
          @click="prevStep"
        >
          Назад
        </button>

        <button
          class="auth-btn"
          type="submit"
          :disabled="!canSubmitSignUp"
        >
          Готово
        </button>
      </div>
    </form>

    <AuthStepDots
      v-if="isSignUp"
      :current="step"
      :total="3"
    />

    <AuthModeSwitch
      :label="switchLabel"
      :button-text="switchButtonText"
      @toggle="toggleMode"
    />
  </AuthShell>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

import AuthHeader from '@/components/auth/AuthHeader.vue'
import AuthLogo from '@/components/auth/AuthLogo.vue'
import AuthModeSwitch from '@/components/auth/AuthModeSwitch.vue'
import AuthPasswordField from '@/components/auth/AuthPasswordField.vue'
import AuthShell from '@/components/auth/AuthShell.vue'
import AuthStepDots from '@/components/auth/AuthStepDots.vue'

import {
  AUTH_COPY,
  AUTH_MODES,
  SIGN_UP_STEPS,
} from '@/constants/auth'

const mode = ref(AUTH_MODES.SIGN_IN)
const step = ref(SIGN_UP_STEPS.PHONE)

const signInForm = reactive({
  login: '',
  password: '',
})

const signUpForm = reactive({
  phone: '',
  nickname: '',
  password: '',
  password_confirm: '',
})

const isSignIn = computed(() => mode.value === AUTH_MODES.SIGN_IN)
const isSignUp = computed(() => mode.value === AUTH_MODES.SIGN_UP)

const pageTitle = computed(() => {
  if (isSignIn.value) return AUTH_COPY.signin.title

  return AUTH_COPY.signup[step.value].title
})

const pageDescription = computed(() => {
  if (isSignIn.value) return AUTH_COPY.signin.description

  return AUTH_COPY.signup[step.value].description
})

const switchLabel = computed(() => {
  return isSignIn.value ? 'Нет аккаунта?' : 'Уже есть аккаунт?'
})

const switchButtonText = computed(() => {
  return isSignIn.value ? 'Зарегистрироваться' : 'Войти'
})

const normalizedPhone = computed(() => {
  return signUpForm.phone.replace(/[^\d+]/g, '')
})

const normalizedNickname = computed(() => {
  return signUpForm.nickname
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9._]/g, '')
})

const canSignIn = computed(() => {
  return signInForm.login.length >= 3 && signInForm.password.length >= 6
})

const canGoToNickname = computed(() => {
  return normalizedPhone.value.length >= 10
})

const canGoToPassword = computed(() => {
  return normalizedNickname.value.length >= 3
})

const passwordError = computed(() => {
  const { password, password_confirm } = signUpForm

  if (!password && !password_confirm) return ''

  if (password.length > 0 && password.length < 6) {
    return 'Пароль должен быть минимум 6 символов.'
  }

  if (password_confirm.length > 0 && password !== password_confirm) {
    return 'Пароли не совпадают.'
  }

  return ''
})

const canSubmitSignUp = computed(() => {
  const { password, password_confirm } = signUpForm

  return (
    password.length >= 6 &&
    password_confirm.length >= 6 &&
    password === password_confirm
  )
})

const resetStep = () => {
  step.value = SIGN_UP_STEPS.PHONE
}

const toggleMode = () => {
  mode.value = isSignIn.value ? AUTH_MODES.SIGN_UP : AUTH_MODES.SIGN_IN
  resetStep()
}

const nextStep = () => {
  if (step.value === SIGN_UP_STEPS.PHONE && !canGoToNickname.value) return
  if (step.value === SIGN_UP_STEPS.NICKNAME && !canGoToPassword.value) return

  if (step.value < SIGN_UP_STEPS.PASSWORD) {
    step.value += 1
  }
}

const prevStep = () => {
  if (step.value > SIGN_UP_STEPS.PHONE) {
    step.value -= 1
  }
}

const submitSignIn = () => {
  if (!canSignIn.value) return

  const payload = {
    login: signInForm.login,
    password: signInForm.password,
  }

  console.log('SignIn payload:', payload)
}

const submitSignUp = () => {
  if (!canSubmitSignUp.value) return

  const payload = {
    phone: normalizedPhone.value,
    nickname: normalizedNickname.value,
    password: signUpForm.password,
    password_confirm: signUpForm.password_confirm,
  }

  console.log('SignUp payload:', payload)
}
</script>

<style scoped>
.auth-form {
  width: 100%;
  display: grid;
  gap: 18px;
  animation: authFade 0.16s ease;
}

.auth-input {
  width: 100%;
  height: 62px;
  padding: 0 18px;
  border: 1px solid #dce1e6;
  border-radius: 16px;
  outline: none;
  background: #eef2f5;
  color: #2b2b2f;
  font-size: 17px;
  font-weight: 500;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.auth-input::placeholder {
  color: #73777f;
  font-weight: 500;
}

.auth-input:focus {
  border-color: #c7cdd4;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(17, 17, 17, 0.04);
}

.auth-btn {
  width: 100%;
  height: 56px;
  border: 0;
  border-radius: 16px;
  background: #636363;
  color: #ffffff;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.18s ease,
    opacity 0.18s ease;
}

.auth-btn:hover:not(:disabled) {
  background: #505050;
}

.auth-btn:disabled {
  opacity: 0.45;
  cursor: default;
}

.auth-actions {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
}

.auth-back-btn {
  width: 100%;
  height: 56px;
  border: 1px solid #dce1e6;
  border-radius: 16px;
  background: #ffffff;
  color: #2b2b2f;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.auth-back-btn:hover {
  background: #f6f7f8;
}

.auth-preview {
  margin-top: -6px;
  color: #6f737a;
  font-size: 15px;
  font-weight: 700;
}

.auth-error {
  margin: -4px 0 0;
  color: #d93025;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 600;
}

@keyframes authFade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 576px) {
  .auth-form {
    gap: 16px;
  }

  .auth-input {
    height: 58px;
    border-radius: 15px;
    font-size: 16px;
  }

  .auth-btn,
  .auth-back-btn {
    height: 54px;
    border-radius: 15px;
    font-size: 17px;
  }

  .auth-actions {
    grid-template-columns: 100px 1fr;
  }
}
</style>