<template>
    <div class="main-body">
        <div
            class="contact-form"
            :class="{ 'show-form-overlay': isFormOpen, 'form-submitted': isFormSubmitted }"
        >
            <div
                class="form-overlay"
                @click="closeForm"
            />
            <div
                id="form-container"
                :class="['icon mdi mdi-pencil', { expand: isFormOpen }]"
                @click="openForm"
            >
                <span
                    id="form-close"
                    class="icon mdi mdi-close"
                    @click.stop="closeForm"
                />
                <div
                    id="form-content"
                    :class="{ expand: isFormOpen }"
                >
                    <div id="form-head">
                        <h1
                            v-if="!isFormSubmitted"
                            class="pre"
                        >
                            Get in touch
                        </h1>
                        <p
                            v-if="!isFormSubmitted"
                            class="pre"
                        >
                            Good choice...
                        </p>
                        <h1
                            v-if="isFormSubmitted"
                            class="post"
                        >
                            Thanks!
                        </h1>
                        <p
                            v-if="isFormSubmitted"
                            class="post"
                        >
                            I'll be in touch ASAP
                        </p>
                    </div>
                    <form @submit.prevent="submitForm">
                        <input
                            v-model="formData.name"
                            class="input name"
                            type="text"
                            name="user_name"
                            placeholder="Your name please"
                            :class="{ 'form-error': formErrors.name }"
                        >
                        <input
                            v-model="formData.email"
                            class="input email"
                            type="text"
                            name="user_email"
                            placeholder="A contact email"
                            :class="{ 'form-error': formErrors.email }"
                        >
                        <select
                            v-model="formData.subject"
                            class="input select"
                            name="subject"
                            :class="{ 'form-error': formErrors.subject }"
                        >
                            <option
                                disabled
                                value=""
                            >
                                What shall we talk about?
                            </option>
                            <option>About a new project</option>
                            <option>About a job opportunity</option>
                            <option>Let's do this over a coffee</option>
                        </select>
                        <textarea
                            v-model="formData.message"
                            class="input message"
                            placeholder="How can I help?"
                            :class="{ 'form-error': formErrors.message }"
                        />
                        <input
                            class="input submit"
                            type="submit"
                            value="Send Message"
                        >
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
    name: 'ContactForm',
    setup () {
        const isFormOpen = ref(false)
        const isFormSubmitted = ref(false)
        const formData = reactive({
            name: '',
            email: '',
            subject: '',
            message: '',
        })
        const formErrors = reactive({
            name: false,
            email: false,
            subject: false,
            message: false,
        })

        const openForm = () => {
            if (!isFormOpen.value) {
                isFormOpen.value = true
            }
        }

        const closeForm = () => {
            if (isFormOpen.value) {
                isFormOpen.value = false
                isFormSubmitted.value = false
                resetForm()
            }
        }

        const resetForm = () => {
            formData.name = ''
            formData.email = ''
            formData.subject = ''
            formData.message = ''
            formErrors.name = false
            formErrors.email = false
            formErrors.subject = false
            formErrors.message = false
        }

        const isValidEmail = (email: string): boolean => {
            const pattern =
        // eslint-disable-next-line no-control-regex, regexp/no-unused-capturing-group
        /^([\w!#$%&'*+\-/=?^`{|}~]+(\.[\w!#$%&'*+\-/=?^`{|}~]+)*|"([\x01-\x08\v\f\x0E-\x1F\x7F]|\\[\x01-\x09\v\f\x0D-\x7F])*")@([a-z\d]+(\.[a-z\d]+)*\.[a-z]{2,})$/i
            return pattern.test(email)
        }

        const submitForm = () => {
            // Reset errors
            formErrors.name = false
            formErrors.email = false
            formErrors.subject = false
            formErrors.message = false

            let hasError = false

            if (!formData.name) {
                formErrors.name = true
                hasError = true
            }

            if (!formData.email || !isValidEmail(formData.email)) {
                formErrors.email = true
                hasError = true
            }

            if (!formData.subject) {
                formErrors.subject = true
                hasError = true
            }

            if (!formData.message) {
                formErrors.message = true
                hasError = true
            }

            if (!hasError) {
                isFormSubmitted.value = true
                setTimeout(() => {
                    resetForm()
                }, 1000)
            }
        }

        return {
            isFormOpen,
            isFormSubmitted,
            formData,
            formErrors,
            openForm,
            closeForm,
            submitForm,
        }
    },
})
</script>

<style scoped lang="scss">
@use "sass:math";

$col-accent: #fff;
$col-primary: #f72f4e;
$col-dark: #140228;
$formElements: 5;

$font-stack: 'Roboto', sans-serif;
$easer: cubic-bezier(0.4, 0, 0.2, 1);

.main-body {
  height: 70vh;
  background: inherit;
}

.contact-form {
  font-family: $font-stack;
  width: 100%;
  font-size: 16px;
  margin: 0;
  padding: 0;
  background: #fafafa;

  h1,
  h2 {
    font-weight: 700;
    color: $col-accent;
    font-size: 4em;
    margin: 0;
    padding: 0 20px;
  }

  .form-overlay {
    width: 0%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    opacity: 0;
    background: #000;
    transition: background 1s, opacity 0.4s, width 0s 0.4s;
  }
  &.show-form-overlay {
    .form-overlay {
      width: 100%;
      opacity: 0.7;
      z-index: 999;
      transition: background 1s, opacity 0.4s, width 0s;
    }
    &.form-submitted .form-overlay {
      background: #119da4;
      transition: background 0.6s;
    }
  }

  #form-container {
    cursor: pointer;
    color: $col-accent;
    z-index: 1000;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 5vh;
    background-color: $col-primary;
    overflow: hidden;
    border-radius: 50%;
    width: 60px;
    max-width: 60px;
    height: 60px;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
    transition: all 0.2s 0.45s, height 0.2s $easer 0.25s,
      max-width 0.2s $easer 0.35s, width 0.2s $easer 0.35s;

    &.expand {
      cursor: auto;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
        0 6px 6px rgba(0, 0, 0, 0.17);
      border-radius: 0;
      width: 70%;
      height: 610px;
      max-width: 610px;
      padding: 0;
      transition: all 0.2s, max-width 0.2s $easer 0.1s,
        height 0.3s ease 0.25s;
    }
  }

  #form-close {
    cursor: pointer;
  }

  .icon::before {
    cursor: pointer;
    font-size: 30px;
    line-height: 60px;
    display: block;
    transition: all 0.7s $easer;
  }
  .icon:hover::before {
    animation: wiggle 0.1s linear infinite;
  }
  .mdi-pencil::before {
    display: block;
  }
  .mdi-close::before {
    display: none;
  }
  .expand.mdi-pencil::before {
    display: none;
  }
  .expand.mdi-close::before {
    display: block;
    animation: none;
  }

  #form-content {
    font-family: $font-stack;
    transform: translateY(150%);
    width: 100%;
    opacity: 0;
    text-align: left;
    transition: transform 0.2s $easer, opacity 0.2s 0.2s;

    &.expand {
      transform: translateY(0px);
      opacity: 1;
      transition: transform 0.7s $easer 0.3s, opacity 0s;
    }

    form {
      color: $col-accent;
      width: 100%;
      height: 100%;
      padding: 0 20px 20px 20px;
      margin-bottom: 10px;
      box-sizing: border-box;
      text-align: left;
    }
  }

  #form-head {
    font-size: 100%;
    padding: 0;
    margin: 0 20px;
    color: $col-accent;
    text-align: center;
    transition: all 0.8s 0.6s;

    h1,
    p {
      padding: 0;
      margin: 0;
    }
    .pre {
      display: block;
    }
    .post {
      display: none;
    }
  }

  &.form-submitted #form-head {
    transform: translateY(250%);
    .pre {
      display: none;
    }
    .post {
      display: block;
    }
  }

  .input {
    background: rgba(0, 0, 0, 0.2);
    display: block;
    height: 50px;
    width: 100%;
    margin: 10px 0;
    padding: 0 10px;
    border-width: 0;
    box-sizing: border-box;
    border: none;
    outline: none;
    box-shadow: none;
    transform: translateX(0);
  }

  ::placeholder {
    color: rgba(255, 255, 255, 0.8);
    font-size: 90%;
  }

  input,
  select,
  textarea {
    color: $col-accent;
  }

  .input.message {
    resize: none;
    height: 150px;
    padding: 10px;
  }

  .input.submit {
    background-color: $col-accent;
    color: $col-primary;
    font-size: 120%;
    height: 80px;
    box-shadow: 0 5px rgba(0, 0, 0, 0.5);
    transition: all 0.1s, transform 0s 0.6s;

    &:active {
      margin-top: 15px;
      box-shadow: 0 0 rgba(0, 0, 0, 0.5);
    }
  }

  .input.form-error {
    animation: error 0.8s ease;
    background: rgba(0, 0, 0, 0.7);
  }

  select option {
    background: $col-primary;
    color: $col-accent;
    border: none;
    box-shadow: none;
    outline: none;
  }
  select option:disabled {
    font-style: italic;
    color: rgba(255, 255, 255, 0.9);
    font-size: 90%;
  }

  .input {
    transition: transform 0s 1s;
  }
  &.form-submitted .input {
    transform: translateX(150%);
    opacity: 0;
    transition: all 0.5s, transform 0.4s $easer 0s;

    @for $i from 1 through $formElements {
      &:nth-child(#{$i}) {
        transition-delay: #{math.div($i, 10)}s;
      }
    }
  }

  @media (max-width: 600px) {
    #form-container.expand {
      height: 100%;
      width: 100%;
      max-width: 100%;
      overflow: initial;
      overflow-x: hidden;
      bottom: 0;
    }
    h1 {
      font-size: 300%;
    }
    .icon:hover::before {
      animation: none;
    }
    .form-overlay {
      display: none;
      transition: none;
    }
  }

  @keyframes error {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-6px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translateX(6px);
    }
  }

  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(-15deg);
    }
    50% {
      transform: rotate(15deg);
    }
  }
}
</style>
