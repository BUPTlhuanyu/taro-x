module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'json'],
  rootDir: __dirname,
  testMatch: ['<rootDir>/src/components/**/*.test.js','<rootDir>/src/components/**/test.js'],  // 指定test文件
  transform: {
    '^.+\\.js?$': 'babel-jest'  // 指定所有的js文件都需要经过babel的处理，因为可能会有一些taro的api
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],  // 需要忽略被babel转换的目录
  moduleNameMapper: {
    '^react$': 'nervjs',
    'react-dom': 'nervjs',
    'react-addons-test-utils': 'nerv-test-utils',
    '\\.(css|less|sass|scss)$': '<rootDir>/__mock__/styleMock.js',
    'weui': '<rootDir>/__mock__/styleMock.js',
  }
}
