module.exports = {
  apps: [
    {
      name: 'web-app',
      script: './build/bin/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
