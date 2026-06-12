const mongoose = require('mongoose');
const taskschema = new mongoose.Schema({
    title:{     

        type:String,
        required:true
    },  
    description:{
        type:String,
        required:true
    }
})
module.exports = mongoose.models.Task || mongoose.model('Task',taskschema);