var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates'),
    permalinks = require('metalsmith-permalinks');

Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

Metalsmith(__dirname)
  .use(markdown())
  .use(templates('handlebars'))
  .use(permalinks({
    pattern: ':collection/:title',
    relative: false
  }))
  .destination('./build')
  .build(function(err, files) {
    if (err) { throw err; }
  });
