module.exports = function(api) {
    api.cache(true);
    return {
        "presets": [
            "@babel/env",
            "@babel/preset-typescript"
        ],
        "plugins": [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread",
            ["@babel/plugin-transform-typescript", {allowNamespaces: true}]
        ]
    };
}