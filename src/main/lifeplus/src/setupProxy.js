const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        ['/weatherAPI','/news','/search','/news','/signup','/login','/addCalendar','/updateCalendar','/deleteCalendar','/selectCalendar'],
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
};