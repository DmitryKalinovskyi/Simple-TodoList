// const { getDefaultConfig } = require('metro-config'); // If you have a bare react-native project
const { getDefaultConfig } = require("expo/metro-config"); // If your project is an expo one

const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@eva-design/eva',
  // Optional, but may be useful when using mapping customization feature.
  // customMappingPath: './custom-mapping.json',
};

module.exports = async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  return MetroConfig.create(evaConfig, defaultConfig);
};