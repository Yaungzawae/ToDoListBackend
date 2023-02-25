const mongooose = require("../config/db.config");


const itemsSchema = new mongooose.Schema({
    task : String,
    date : String,
    cross : Boolean
})
const Items = mongooose.model("items", itemsSchema);

module.exports = Items
