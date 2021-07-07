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

//if scheme id return steps related to that scheme id
function findSteps(id) {
    return db('schemes')
    .join("steps", "schemes.id", "steps.scheme_id") 
    //joining steps table (join Steps on Schemes.Id = Steps.Scheme_Id)
    //where the two tables are similar
    .select("steps.id", "schemes.scheme_name", "steps.step_number","steps.instructions")
    .where({ scheme_id: id })
}

//Number(id) turns the "string" into a number on scheme_id

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
    return findById(id)
    .then(scheme => {
       return db('schemes')
        .where({ id })
        .del()
        .then(() => scheme);
    })
   
}