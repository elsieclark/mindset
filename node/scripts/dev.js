
const label = 'dev';
console.time(label);

const _     = require('lodash');
const steps = require('vitreum/steps');
const Proj  = require('./project.json');
const { libs, shared } = Proj;

Promise.resolve()
    .then(() => Promise.all(_.map(Proj.entryPoints, (path, name) => {
        return steps.jsxWatch(name, path, { libs, shared })
            .then((deps) => steps.lessWatch(name, { shared }, deps));
    })))
    .then(() => steps.assetsWatch(Proj.assets, shared))
    .then(() => steps.livereload())
    .then(() => steps.serverWatch('./server/server.js', ['server']))
    .then(() => console.timeEnd(label))
    .catch((err) => console.error(err));