const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
	transpileDependencies: true,

	pluginOptions: {
		vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		},
		electronBuilder: {
            nodeIntegration: true,
			// List native deps here if they don't work
			externals: ['fs']
		}
	}
});
