module.exports = {
  apps: [
    {
      name: 'nestjs-prod',
      script: './dist/main.js',
      args: '',
      exec_mode: 'cluster',
      instances: 2, //"max",
      kill_timeout: 4000,
      listen_timeout: 10000,
      wait_ready: true,
      autorestart: true,
      // 파일 변경을 감지하여 자동으로 재시작할지 여부
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm Z',

      env_dev: {
        NODE_ENV: 'dev',
      },
      env_qa: {
        NODE_ENV: 'qa',
      },
      env_prod: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
