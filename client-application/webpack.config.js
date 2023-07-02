const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");

module.exports = {
    plugins: [
        new MomentLocalesPlugin({
            localesToKeep: ['en', 'pl'],
        }),
        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    { pattern: "./src/i18n/pl/*.json", fileName: "./assets/i18n/pl.json" },
                    { pattern: "./src/i18n/en/*.json", fileName: "./assets/i18n/en.json" },
                    { pattern: "./src/i18n/pl/*.json", fileName: "../src/assets/i18n/pl.json" },
                    { pattern: "./src/i18n/en/*.json", fileName: "../src/assets/i18n/en.json" },
                ]
            }
        }),
    ]
};
