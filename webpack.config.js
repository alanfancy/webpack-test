var path=require('path');// 导入路径包
var webpack=require('webpack');
var autoprefixer=require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin=require('html-webpack-plugin');//静态资源 版本控制

var DEVELOPMENT=process.env.NODE_ENV==='development';
var PRODUCTION=process.env.NODE_ENV==='production';
//// 生产环境才需要用到的代码，比如控制台里看到的警告
var entry=PRODUCTION
    ?   ['./src/index.js']
    :   [
        './src/index.js',
        'webpack/hot/dev-server',//开启热重载 hot
        'webpack-dev-server/client?http://localhost:8080'//添加webpack-dev-server客户端
    ];
var plugins=PRODUCTION
    ?   [
            new webpack.optimize.UglifyJsPlugin({
                // comments:false,
                /*compress:{
                    warnings: false
                }*/
            }),// 压缩webpack 后生成的代码较长时间，通常推到生产环境中才使用
            new ExtractTextPlugin(//提取样式插件
                'style-[contenthash:10].css'//根据内容生成hash值
                //,{allChunks: true}//所有分离文件的样式也会全部压缩到一个文件上
            ),
            new HTMLWebpackPlugin({// webpack 指定目录(package内设置)生成静态HTML文件//自动生成html插件
                template:'index-template.html'
            })
        ]
    :   [
        new webpack.HotModuleReplacementPlugin()//全局开启代码热替换 如果是CLI这里则不用写
    ];
plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT:JSON.stringify(DEVELOPMENT),
        PRODUCTION:JSON.stringify(PRODUCTION)
    })
);
/*plugins.push(
    new webpack.LoaderOptionsPlugin({
        debug: false,
        options: {
            postcss: function () {
                return [precss, autoprefixer];
            }
        }
    })
);*/
const cssIdentifier=PRODUCTION? '[hash:base64:10]' : '[path][name]---[local]';
const cssLoader=PRODUCTION
    ?   ExtractTextPlugin.extract({
            loader:'css-loader?localIdentName=' + cssIdentifier
        })
    :   ['style-loader', 'css-loader?localIdentName=' + cssIdentifier];
module.exports={
    externals:{
      'jquery':'jQuery'
    },
    devtool:'source-map',//打包代码的同时生成一个sourcemap文件，并在打包文件的末尾添加//# souceURL，注释会告诉JS引擎原始文件位置
    entry:entry,//入口文件
    plugins:plugins,
    module: {
        /*rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: 'css-loader'
            }, {
                loader: "less-loader", options: {
                    strictMath: true,
                    noIeCompat: true
                }
            }]
        }],*/
        loaders:[
            {
                test: /\.js$/,
                loaders: ["babel-loader"],
                exclude: "./node_module/"
            },
            {
                test: /\.css$/,
                loaders: cssLoader,
                exclude: "./node_module/"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loaders: ["url-loader?limit=20000&name=images/[hash:12].[ext]"],
                exclude: "./node_module/"
            }
        ]
    },
    output:{
        path:path.join(__dirname,'dist'),// 指定打包之后的文件夹
        //publicPath:'/dist/',// 指定资源文件引用的目录
        publicPath: PRODUCTION ? '/' : '/dist/',
        filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'// 指定打包为一个文件 bundle.js
        //filename: '[name].js' // 可以打包为多个文件
    }
};

/*
 "babel-core"  //转换器
 "babel-loader"  //转换器的加载器
 "babel-preset-es2015" //ES2015转码规则
 "babel-preset-stage-0" //es7支持，ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个stage-0，stage-1，stage-2，stage-3
 */
