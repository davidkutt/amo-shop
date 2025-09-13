module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "components": "./src/components",
          "screens": "./src/screens",
          "services": "./src/services",
          "assets": "./src/assets",
          "context": "./src/context",
          "navigation" :"./src/navigation",
          "theme" :"./src/theme",
          "hooks" :"./src/hooks",
        }
      }
    ],
    'react-native-reanimated/plugin',
  ]
};
