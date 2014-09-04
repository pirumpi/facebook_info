var router = require('tiny-router');

router.use('static', {path: __dirname + '/public'});

router.listen(8080);