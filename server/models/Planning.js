let mongoose = require('mongoose');
require('mongoose-double')(mongoose);
let SchemaTypes = mongoose.Schema.Types;
let Schema = mongoose.Schema;

let Planning = new Schema({
    data: [
        {
            id: {
                type: Number
            },
            text: {
                type: String
            },
            start_date: {
                type: String
            },
            duration: {
                type: Number
            },
            progress: {
                type: SchemaTypes.Double
            },
            text_detail : {
                type: String
            }
        }
    ],
    links: [
        {
            id: {
                type: Number
            },
            source: {
                type: Number
            },
            target: {
                type: Number
            },
            type: {
                type: Number
            }
        }

    ]
});

module.exports = mongoose.model('Planning', Planning);
