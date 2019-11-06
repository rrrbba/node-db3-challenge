const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db.select('*').from('schemes');
};

function findById(id) {

    return db('schemes')
    .where({id})
    .first();
}

function findSteps(id) {
    return db('schemes')
    .join("steps", "schemes.id", "steps.scheme_id") 
    .select("steps.id", "schemes.scheme_name", "steps.step_number","steps.instructions")
    .where({ scheme_id: id })
}

function add(scheme) {
    return db('schemes')
    .insert(scheme)
    .then(ids => ({ id: ids[0] }))
}

function update(change, id) {
    return db('schemes')
    .where({ id })
    .update(change)
};

function remove(id) {
    return db('schemes')
    .where({ id })
    .del();
}