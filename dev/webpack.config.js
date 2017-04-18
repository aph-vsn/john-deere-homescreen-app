import webpack from "webpack";
import { DIST_APP_DIR_PATH } from "./scripts/consts";

/**
 * The webpack configuration file for the 'hello-lynx-react' app.
 *
 * For more information, see: http://webpack.github.io/docs/configuration.html
 */
function create({ minify = false } = {}) {
    return {
        entry: "./src/main",

        devtool: "source-map",

        externals: {
            platform: "vsn_platform"
        },

        output: {
            path: DIST_APP_DIR_PATH,
            filename: minify ? "app.min.js" : "app.js"
        },

        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                minimize: true,
                sourceMap: true
            })
        ],

        // Transform source code using Babel
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                }
            ]
        },

        // Automatically transform files with these extensions
        resolve: {
            extensions: [".js", ".jsx"]
        }
    };
}

export { create };
