
const label = 'build';
console.time(label);

const _     = require('lodash');
const steps = require('vitreum/steps');
const Proj  = require('./project.json');
const { libs, shared } = Proj;

Promise.resolve()
    .then(() => steps.clean())
    .then(() => steps.libs(Proj.libs))
    .then(() => Promise.all(_.map(Proj.entryPoints, (path, name) => {
        return steps.jsx(name, path, { libs, shared })
            .then((deps) => steps.less(name, { shared }, deps));
    })))
    .then(() => steps.assets(Proj.assets, shared))
    .then(() => console.timeEnd(label))
    .catch((err) => console.error(err));