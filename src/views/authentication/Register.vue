<template>
  <div id="register" class="page">
    <div class="prompt">
      <div class="header">
        <h3 class="welcome">Welcome to Announce.</h3>
        <div class="login-alt">
          <div>Already have a account?</div>
          <router-link to="/login">Log in here.</router-link>
        </div>
      </div>
      <div class="error" style="width: 80%; color: #f70d1a">
        {{ error }}
      </div>
      <form @submit.prevent="register()">
        <div class="field">
          <div class="flex">
            <div class="label">Username</div>
          </div>
          <input class="field-input" id="username" type="text" v-model="username" />
        </div>
        <div class="field">
          <div class="flex">
            <div class="label">Email</div>
          </div>
          <input class="field-input" id="email" type="text" v-model="email" />
        </div>
        <div class="field">
          <div class="flex">
            <div class="label">Password</div>
          </div>
          <input class="field-input" id="password" type="password" v-model="password" />
        </div>
        <input type="submit" class="button" value="Sign up" />
      </form>
      <div class="alt">
        <div class="line"></div>
        <div>or sign up with</div>
        <div class="line"></div>
      </div>
      <div class="google" @click="googleLogin()">
        <img src="@/assets/general/google.svg" />
        <div class="text">Google</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth'; 

import router from '../../router';
import { Authentication } from '@/store';
import { db } from '@/firebase';

@Component({})
export default class Register extends Vue {
  username = '';
  email = '';
  password = '';
  error = '';

  async register() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(async () => {
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
      Authentication.SET_USER(firebase.auth().currentUser);

      db.collection('users').doc(firebase.auth().currentUser?.uid).set({
        username: this.username
      });

      router.push('/');
    }).catch((err) => {
      this.error = err.message;
    });
  }

  async googleLogin() {
    try {
      const result = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider);
      Authentication.SET_USER(result.user);

      db.collection('users').doc(firebase.auth().currentUser?.uid).set({
        username: firebase.auth().currentUser?.displayName
      });

      router.push('/');
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<style lang="scss" scoped>
$field-size: 300px;

#register {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Rubik;
  height: 100vh;
}

.prompt {
  width: 420px;
  height: 480px;
  background: #fbfbfb;
  margin-bottom: 30px;
  margin-left: 200px;
  border-radius: 6px;
  border: 1px solid #e6e3e3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  width: $field-size;
  text-align: left;
  margin-bottom: 15px;

  .welcome {
    font-size: 22px;
    font-family: 'Rubik SemiBold';
  }

  .login-alt {
    display: flex;
    align-items: center;

    a {
      color: #1b7c4b;
      margin-left: 4px;
      text-decoration: underline;

      &:visited {
        color: #1b7c4b;
      }
    }
  }
}

.flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.field {
  width: $field-size;
  text-align: left;

  .label {
    margin: 8px 0 8px 0;
    font-size: 14px;
  }

  .field-input {
    $vertical-padding: 6px;
    $horizontal-padding: 10px;
    width: 92%;
    outline: none;
    font-size: 15px;
    border-radius: 5px;
    border: 2px solid #d1caca;
    padding: $vertical-padding $horizontal-padding;
  }
}

.button {
  $padding: 10px;
  width: 100%;
  padding: $padding 0 $padding 0;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  outline: none;
  background: #25ac68;
  color: #ffffff;
  transition: background 0.2s ease-in;
  &:hover {
    cursor: pointer;
    background: #20965b;
  }
}

.alt {
  width: 100%;
  margin-top: 10px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  .line {
    margin: 0 5px;
    width: 23%;
    border: 1px solid #e6e6e6;
    border-radius: 100px;
  }
}

.google {
  $img-size: 22px;
  $spacing: 8px;
  width: $field-size;
  height: 38px;
  margin-top: 10px;
  background: white;
  border-radius: 4px;
  border: 1.5px solid #3e4a61;
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    margin: 0 $spacing 0 $spacing;
  }
  img {
    width: $img-size;
    height: $img-size;
  }
  &:hover {
    cursor: pointer;
  }
}

@media screen and (max-width: 875px) {
  #register {
    height: 100%;
  }

  .prompt {
    margin-left: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>