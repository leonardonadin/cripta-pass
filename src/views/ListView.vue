<template>
    <div class="list light">
        <v-container>
            <v-row>
                <v-col cols="4" class="text-center">
                    <h4>Listagem de senhas</h4>
                    <v-btn block class="mb-3" @click="addItem" color="success" dark>
                        Adicionar grupo
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-card v-for="item in items" :key="item.id" color="grey-lighten-4" class="pa-1">
                        <v-card-title class="text-left">
                            <v-row align="center">
                                <v-col>
                                    <v-card-title-text class="text-left">
                                        <v-icon size="x-small" color="primary">mdi-folder</v-icon>
                                        <span class="headline text-left">{{ item.name }}</span>
                                    </v-card-title-text>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn @click="editItem(item)" size="x-small" color="warning" dark>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-list>
                                <template v-for="(subItem, index) in item.subItems" :key="index">
                                    <v-list-item
                                        :title="subItem && subItem.name ? subItem.name : 'Vazio'"
                                        class="text-left">
                                        <template v-slot:append>
                                            <v-btn @click="editSubItem(subItem)" size="x-small" icon="mdi-pencil">
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-list-item>
                                </template>
                            </v-list>
                            <v-btn block class="mb-3" @click="addSubItem(item)" color="success">
                                Adicionar item
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card v-if="itemToEdit">
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    v-model="itemToEdit.name"
                                    label="Nome"
                                    type="text"
                                ></v-text-field>
                                <v-btn
                                    color="primary"
                                    class="white--text"
                                    @click="storeData">
                                    Salvar
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                    <v-card v-if="subItemName && subItemValue">
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    v-model="subItemName"
                                    label="Nome"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    v-model="subItemValue"
                                    label="Senha"
                                    type="text"
                                ></v-text-field>
                                <v-btn
                                    color="primary"
                                    class="white--text"
                                    @click="storeData">
                                    Salvar
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
const fs = require('fs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(localStorage.getItem('pass'));

export default {
    name: 'ListView',
    data: () => ({
        items: [],
        itemToEdit: null,
        subItemToEdit: null,
        subItemName: '',
        subItemValue: ''
    }),
    mounted: async function () {
        var filePath = localStorage.getItem('file');
        var items = await fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
        this.items = JSON.parse(items);
    },
    methods: {
        addItem() {
            this.items.push({
                id: (new Date()).getTime(),
                name: 'Grupo',
                subItems: []
            });
        },
        addSubItem(item) {
            item.subItems.push({
                name: 'SubItem',
                value: ''
            });
        },
        editItem(item) {
            this.itemToEdit = item;
        },
        editSubItem(subItem) {
            this.subItemToEdit = subItem;

            var data = { ...subItem};
            if(data.password) {
                data.password = cryptr.decrypt(data.password);
            }
            this.subItemName = subItem.name;
            this.subItemValue = subItem.value;
        },
        storeData() {
            this.subItemToEdit.name = this.subItemName;
            this.subItemToEdit.value = cryptr.encrypt(this.subItemValue);

            var filePath = localStorage.getItem('file');
            fs.writeFileSync(filePath, JSON.stringify(this.items));
            this.itemToEdit = null;
            this.subItemToEdit = null;
            this.subItemName = '';
            this.subItemValue = '';
        }
    }
}
</script>
