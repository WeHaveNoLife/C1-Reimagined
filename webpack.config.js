module.exports = {
    entry: "index.js",
    output: {
        path: __dirname,
        filename: "index_bundle.js"
    },
    module: {
        loaders: [
             { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};