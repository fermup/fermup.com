var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    Handlebars  = require('handlebars'),
    fs          = require('fs'),
    watch       = require('metalsmith-watch'),
    serve       = require('metalsmith-serve');


Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

Metalsmith(__dirname)
    .use(collections({
        pages: {
            pattern: 'content/pages/*.md'
        },
        podcast: {
            pattern: 'content/podcast/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':collection/:title'
    }))
    .use(templates('handlebars'))
    .use(watch())
    .use(serve())
    .destination('./build')
    .build(function(err, files) {
        if (err) { throw err; }
    });
