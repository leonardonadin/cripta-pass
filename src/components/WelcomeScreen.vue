<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="auto" text="center">
                <div class="text-center">
                    <v-img
                        :src="require('@/assets/logo.png')"
                        contain
                        max-height="100"
                    />
                </div>

                <h1 class="display-2 font-weight-bold mb-3 text-center">
                    Bem vindo ao CriptaPass
                </h1>

                <p class="subheading font-weight-regular">
                    Antes de continuar informe a senha mestra para descriptografar os dados.
                </p>

                <hr />

                <v-text-field
                    v-model="pass"
                    label="Insira sua senha">
                    <template v-slot:append>
                        <v-icon>mdi-lock</v-icon>
                    </template>
                </v-text-field>
                <input type="text" v-model="test"
                    style="width: 100%; height: 50px; color: dark; font-size: 20px; padding: 5px;">

                <v-btn
                    color="primary"
                    class="white--text"
                    @click="storePass">
                    Continuar
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'WelcomeScreen',
        data: () => ({
            pass: ''
        }),
        methods: {
            storePass() {
                localStorage.setItem('pass', this.pass)
            }
        }
    }
</script>