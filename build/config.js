const path = require('path')

module.exports = {
    entryList: {
        "common":["react","react-dom"],
        'marketing': {
            "effecttracking": './src/mods/marketing/effectTracking/index.js',
            "effectcomparison": './src/mods/marketing/effectComparison/index.js',
            "breakdown": './src/mods/marketing/breakDown/index.js',
            "channelManage": './src/mods/marketing/channelManage/index.js',
            "packageManage": './src/mods/marketing/packageManage/index.js',
            "linkManage": './src/mods/marketing/linkManage/index.js',
        },
        "index": ['./src/mods/index/index.js']
    }
}