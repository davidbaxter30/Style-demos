const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const extractLess = new ExtractTextPlugin({
    filename:'less.bundle.css'
});
const extractSass = new ExtractTextPlugin({
    filename:'scss.bundle.css'
});

module.exports = {
    entry: ['./src/app.js', './src/scss/main.scss', './src/less/main.less'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLess.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test:/\.(s*)css$/,
                use: extractSass.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader'],
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
    plugins: [
        extractSass,
        extractLess,
        new HtmlWebpackPlugin({
            title: 'Less Example',
            template: 'index.html'
        })
    ]
};