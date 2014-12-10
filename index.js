var Metalsmith    = require('metalsmith'),
    branch        = require('metalsmith-branch'),
    markdown      = require('metalsmith-markdown'),
    templates     = require('metalsmith-templates'),
    collections   = require('metalsmith-collections'),
    permalinks    = require('metalsmith-permalinks'),
    drafts        = require('metalsmith-drafts'),
    Handlebars    = require('handlebars'),
    fs            = require('fs'),
    autoprefixer  = require('metalsmith-autoprefixer'),
    cleanCSS      = require('metalsmith-clean-css'),
    uglify        = require('metalsmith-uglify'),
    htmlescape    = require('metalsmith-htmlescape'),
    headingsidentifier = require('metalsmith-headings-identifier'),
    watch         = require('metalsmith-watch'),
    serve         = require('metalsmith-serve');


Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

Metalsmith(__dirname)
    .use(autoprefixer())
    .use(drafts())
    .use(collections({
        podcast: {
            pattern: 'content/podcast/*.md',
            sortBy: 'date',
            reverse: true
        },
        blog: {
            pattern: 'content/blog/*.md',
            sortBy: 'date',
            reverse: true
        },
        tutorials: {
            pattern: 'content/tutorials/*.md',
            sortBy: 'date',
            reverse: true
        },
        recipes: {
            pattern: 'content/recipes/*.md',
            sortBy: 'date',
            reverse: true
     }
    }))
    .use(markdown())
    .use(templates('handlebars'))
    .use(branch('content/podcast/*')
        .use(permalinks({
            pattern: ':collection/:title',
            relative: false
        }))
    )
    .use(branch('static/*')
        .use(permalinks({
            pattern: ':title',
            relative: false
         }))
    )
    .use(cleanCSS())
    .use(uglify())
    .use(htmlescape())
    .use(headingsidentifier())
    .use(watch())
    .use(serve())
    .destination('./build')
    .build(function(err, files) {
        if (err) { throw err; }
    });
