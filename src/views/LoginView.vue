<template>
	<div class="login">
		<div class="login__content">
			<div class="login__header">Авторизация</div>

			<div class="login__body">
				<div v-if="errorMessage" class="login__error">
					<p class="login__error-message">
						{{ errorMessage }}
					</p>
				</div>

				<form @submit.prevent="handleSubmit" class="login__form">
					<div class="login__form-content">
						<div class="login__line">
							<Input
								v-model="data.username"
								type="text"
								label="Логин или Телефон"
							>
								<template #icon>
									<img src="/images/tel-icon.svg" alt="" />
								</template>
							</Input>
						</div>
						<div class="login__line">
							<Input
								v-model="data.password"
								:type="showPassword ? `text` : 'password'"
								label="Пароль"
							>
								<template #icon>
									<img src="/images/password-icon.svg" alt="" />
								</template>
								<template #action_icon>
									<button type="button">
										<img
											v-if="!showPassword"
											@click="showPassword = !showPassword"
											src="/images/eye-close-icon.svg"
											alt=""
										/>
										<img
											v-else
											@click="showPassword = !showPassword"
											src="/images/eye-open-icon.svg"
											alt=""
										/>
									</button>
								</template>
							</Input>
						</div>
					</div>

					<Button
						:disabled="!readyValues"
						type="submit"
						text="Войти"
						additional-class="login__button"
					/>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { login } from '@/api/user'
import { saveToken } from '@/utils/tokenAuth'
import Button from '@/components/UI/Button.vue'
import Input from '@/components/UI/Input.vue'

export default {
	components: { Input, Button },
	data() {
		return {
			showPassword: false,

			data: {
				username: '',
				password: null,
			},

			errorMessage: null,
		}
	},
	computed: {
		readyValues() {
			return Object.values(this.data).every(
				value => value !== null && value !== ''
			)
		},
	},
	methods: {
		async handleSubmit() {
			this.errorMessage = null
			try {
				const response = await login(this.data)

				if (response.status === 200) {
					saveToken(response.data.key)
					this.$router.push('/')
					this.$toast.open('Вы успешно авторизовались')
				}
			} catch (error) {
				console.error(error)
				const errorMessage = error.response.data.data.non_field_errors[0]

				if (errorMessage) this.errorMessage = errorMessage

				this.$toast.open({
					message: 'Произошла ошибка при попытке авторизоваться',
					type: 'error',
				})
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.login {
	background-image: url('/public/images/bg-login.jpg');
	background-repeat: no-repeat;
	background-position: top center;
	background-size: cover;

	height: 100dvh;

	display: flex;
	justify-content: center;
	align-items: center;

	&__content {
		width: 350px;
	}

	&__body {
		padding: 52px 20px 20px;

		background-color: var(--bg-color);
		border-radius: 5px;
	}

	&__header {
		position: relative;
		z-index: 2;
		padding: 18px 0;
		margin-bottom: -20px;
		margin-right: 18px;
		margin-left: 18px;
		background-color: var(--primary-color);

		text-align: center;
		font-family: 'Inter';
		font-size: 16px;
		font-weight: 500;
		line-height: 125%; /* 125% */
		color: var(--text-color-white);

		border-radius: 5px;
	}

	&__error {
		margin-bottom: 16px;

		background-color: #fcebea;
		border: 1px solid #f86c6b;
		color: #cc1f1a;
		padding: 1rem;
		border-radius: 4px;
	}

	&__error-message {
		font-size: 14px;
		text-align: center;
	}

	&__form {
	}

	&__form-content {
		display: flex;
		flex-direction: column;
		row-gap: 8px;
	}
	&__line {
	}

	&__button {
		margin-top: 28px;
		width: 100%;
	}
}
</style>
