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

                <br />

                <v-text-field
                    v-model="pass"
                    label="Insira sua senha">
                    <template v-slot:append>
                        <v-icon>mdi-lock</v-icon>
                    </template>
                </v-text-field>

                <p class="font-weight-regular">
                    Informe o arquivo de dados criptografados ou o local onde será armazenado.
                </p>

                <v-switch
                    v-model="isNewFile"
                    label="Começar com um novo arquivo?"
                    color="primary"
                    :true-value="true"
                    :false-value="false"
                    hide-details
                ></v-switch>

                <div v-if="isNewFile">
                    <v-btn
                        color="primary"
                        class="white--text"
                        @click="selectDirectory">
                        Selecionar local <v-icon>mdi-file-upload</v-icon>
                    </v-btn>
                </div>

                <div v-if="!isNewFile">
                    <v-file-input
                        v-model="file"
                        label="Selecione o arquivo"
                        accept=".json">
                        <template v-slot:append>
                            <v-icon>mdi-file-upload</v-icon>
                        </template>
                    ></v-file-input>
                </div>

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
    const { remote } = require('electron')

    export default {
        name: 'WelcomeScreen',
        data: () => ({
            pass: '',
            file: [],
            directory: [],
            isNewFile: false,
        }),
        methods: {
            storePass() {
                console.log(this.pass);
                console.log(this.file);
                console.log(this.directory);
                console.log(this.directory);
                console.log(this.isNewFile);
                // localStorage.setItem('pass', this.pass);
                // this.$router.push('/about');
            },
            async selectDirectory() {
                var dir = await remote.dialog.showOpenDialog({
                    properties: ['openDirectory']
                });
                this.directory = dir.filePaths[0];
            }
        }
    }
</script>