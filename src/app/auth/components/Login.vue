<template>
  <guest-layout>
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                   <ValidationObserver ref="observer">
                  <form class="user" @submit.prevent="validateAndAttemptLogin">
                    <div class="form-group">
                      <ValidationProvider  rules="required|email" v-slot="{ errors }">
                        <input id="email" @input="_data.errors.email = ''" v-model="form.email" :class="{ 'is-invalid': errors[0] || _data.errors.email }" type="email" class="form-control form-control-user" aria-describedby="emailHelp" placeholder="Enter Email Address..." required/>
                        <p class="invalid-feedback" id="input-1-live-feedback">
                            {{ errors[0] || _data.errors.email }}
                          </p>
                      </ValidationProvider>
                    </div>
                    <div class="form-group">
                      <ValidationProvider  rules="required|min:4" v-slot="{ errors }">
                        <input id="password" @input="_data.errors.password = ''" v-model="form.password" :class="{ 'is-invalid': errors[0] || _data.errors.password }" :type="showPassword ? 'text' : 'password'" class="form-control form-control-user" placeholder="Password" required/>
                        <p class="invalid-feedback" id="input-1-live-feedback">
                          {{ errors[0] || _data.errors.password }}
                        </p>
                      </ValidationProvider>
                    </div>
                    
                      <div class="form-group">
                      <p class="float-right">
                        <a class="cursor-pointer fs-smaller mb-2" @click="changeShowPassword">{{ showPassword ? 'hide' : 'show' }} password</a>
                      </p>
                      </div>
                        
                    <div class="form-group pt-5 text-center" v-show="sessionHasExpired">
                      <p class="text-danger fs-smaller" >Your session has expired. Kindly sign in.</p>
                    </div>

                    <div class="form-group">
                      <button type="submit" class="btn btn-primary btn-user btn-block" :class="{disabled: isBusy}" :disabled="isBusy">{{ !isBusy ? 'Login' : 'Loading...' }}</button>
                    </div>
                  </form>
                  </ValidationObserver>
                  
                  <hr />
                  <!-- <div class="text-center">
                    <a class="small" href="forgot-password.html"
                      >Forgot Password?</a
                    >
                  </div> -->
                  <!-- <div class="text-center">
                    <a class="small" href="register.html">Create an Account!</a>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </guest-layout>
</template>

<script>
import GuestLayout from "@/app/layouts/guest/Layout";
import { mapGetters, mapMutations } from "vuex";
import { setUserType, isAuthUserValid } from "@/app/helpers/authentication";
import { API } from "@/app/helpers/env";
export default {
  name: "Login",
  components: { GuestLayout },
  data() {
    return {
      showPassword: false,
      isBusy: false,
      form: {
        email: "",
        password: ""
      },
      errors: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      sessionHasExpired: "auth/getSessionHasExpired"
    })
  },
  methods: {
    ...mapMutations({
      setAuthUserInStore: "auth/SET_AUTH_USER"
    }),
    /** Hide/show password */
    changeShowPassword() {
      return (this.showPassword = !this.showPassword);
    },

    validateAndAttemptLogin() {
      this.$refs.observer.validate().then(results => {
        if (!results) {
          return false;
        }
        this.isBusy = true;
        this.sendLoginRequest();
      });
    },

    /** Attempt login */
    async sendLoginRequest() {
      await this.$http
        .post(`${API}/auth/login`, {
          email: this.form.email,
          password: this.form.password
        })
        .then(res => {
          const { data } = res.data;
          this.setUserToLocalStorageWith(data);
          /** Set session expiration to false in case of any */
          this.$store.commit("auth/SET_SESSION_HAS_EXPIRED", false);
          this.$router.push({ name: "dashboard" });
        })
        .catch(err => {
          this.isBusy = false;
          return this.displayValidationErrorsFromServer(err);
        });
    },

    /** Set the access token of the user to local storage */
    setUserToLocalStorageWith(payload) {
      localStorage["jwt"] = payload.access_token;
      localStorage["user"] = JSON.stringify(payload.user);
      this.setAuthUser();
      this.setAuthUserInStore({name: payload.user['name']})
      this.isBusy = false;
    },

    /** In case there are validation errors from the server red */
    displayValidationErrorsFromServer(err) {
      if (err.response) {
        this.isBusy = false;
        const { data, status } = err.response;

        switch (status) {
          case 401:
            var { code, message } = data.error;
            this.errors[code] = message;
            break;

          case 422:
            this.errors = data.errors;
            break;

          default:
            break;
        }
      }
    },

    /** Set authenticated user to cookies and jwt to browser */
    setAuthUser() {
      if (localStorage["jwt"] && isAuthUserValid(localStorage["jwt"])) {
        return setUserType();
      }
    }
  }
};
</script>
