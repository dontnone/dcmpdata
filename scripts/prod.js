const webpack = require("webpack");

const config = require('../build/webpack.prod');

const ora = require('ora')

const spinner = ora('打包中')

spinner.start()

webpack(config, function(err, stats){
    spinner.stop()
    
	if(err) throw err
		
	process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
})