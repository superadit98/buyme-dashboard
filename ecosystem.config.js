module.exports = {
  apps: [{
    name: 'supplychain',
    script: 'node_modules/.bin/next',
    args: 'dev -p 8903',
    cwd: '/home/ubuntu/supplychain',
    max_restarts: 5,
    restart_delay: 3000,
    autorestart: true,
  }]
};
