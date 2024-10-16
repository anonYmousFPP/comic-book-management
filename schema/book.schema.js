import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGO_URL);

const book_schema = new mongoose.Schema({
    book_name:{
        type: String,
        required: true,
    },
    author_name:{
        type:String,
        required: true,
    },
    year_of_publication:{
        type:String,
    },
    price:{
        type: Number,
    },
    discount:{
        type:String,
    },
    number_of_pages:{
        type:Number,
    },
    condition:{
        type: String,
        enum: ['new', 'used'],
        default: 'new'
    },
    description:{
        type:String,
        default: 'Owner choose not to add the description'
    }
})

const Books = mongoose.model('Books', book_schema);
export default Books;