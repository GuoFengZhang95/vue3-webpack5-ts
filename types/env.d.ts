/**
 * @description 环境变量类型声明
 */
declare namespace NodeJS {
  interface Process {
    env: {
      ENV: '' | 'dev' | 'test' | 'pre'
      MODE: 'local' | 'server'
    }
  }
}