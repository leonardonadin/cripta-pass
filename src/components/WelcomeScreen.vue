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

                <div class="mb-5">
                    <h1 class="display-2 font-weight-bold mb-3 text-center">
                        Bem vindo ao CriptaPass
                    </h1>
                    <p class="subheading font-weight-regular">
                        Antes de continuar informe a senha mestra para descriptografar os dados.
                    </p>
                </div>

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

                <div v-if="isNewFile" class="mb-5">
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
                    :disabled="isValidated()"
                    @click="storeData">
                    Continuar
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    const { remote } = require('electron');
    const fs = require('fs');

    export default {
        name: 'WelcomeScreen',
        data: () => ({
            pass: '',
            file: [],
            directory: [],
            isNewFile: false,
        }),
        mounted: function() {
            var filePath = localStorage.getItem('file');
            if(filePath) {
                this.$router.push('/list');
            }
        },
        methods: {
            storeData() {
                localStorage.setItem('pass', this.pass);
                if(this.isNewFile) {
                    var filePath = this.directory+'/data.json';
                    fs.writeFileSync(filePath, JSON.stringify([]));
                    localStorage.setItem('file', filePath);
                } else {
                    localStorage.setItem('file', this.file);
                }

                this.$router.push('/list');
            },
            async selectDirectory() {
                var dir = await remote.dialog.showOpenDialog({
                    properties: ['openDirectory']
                });
                this.directory = dir.filePaths[0];
            },
            isValidated() {
                if(this.isNewFile) {
                    return this.pass.length === 0 || this.directory.length === 0;
                } else {
                    return this.pass.length === 0 || this.file.length === 0;
                }
            }
        }
    }
</script>