module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        "nativewind/babel",
        'react-native-reanimated/plugin',
        // [
        //     'module-resolver',
        //     {
        //       root: ['./src'],
        //       extensions: ['.js', '.json', '.ts', '.tsx', '.jsx'],
        //       alias: {
        //         '@': './src',
        //       },
        //     },
        // ],
    ],

};