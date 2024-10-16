import express from 'express';
import Books from '../schema/book.schema.js'
import {z} from "zod";
const router = express.Router();

// Input validation through ZOD
const bookSchema = z.object({
    book_name: z.string().min(1, "Book name is required"),
    author_name: z.string().min(1, "Author name is required"),
    year_of_publication: z.string().optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    discount: z.string().optional(),
    number_of_pages: z.number().int().positive("Number of pages must be a positive integer").optional(),
    condition: z.enum(['new', 'used']).optional(),
    description: z.string().default('Owner choose not to add the description'),
});

router.get('/find', async (req, res) => {
    try {
        const id = req.query.id;
        const response = await Books.findById(id);

        if(!response){
            res.status(300).send("Book is not found");
        }

        res.status(300).json({response});
    } catch (e) {
        console.log(`Error is found ${e}`);
        res.status(404).send("Error is found");
    }
});

router.get('/allBooks', async (req, res) => {
    try {
        // Get the page and limit from query parameters, default to 1 and 10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const data = await Books.find().skip(skip).limit(limit);
        const totalBooks = await Books.countDocuments();
        const totalPages = Math.ceil(totalBooks / limit); // Calculate total pages

        res.status(200).json({
            totalBooks,
            totalPages,
            currentPage: page,
            data,
        });
    } catch (e) {
        console.log(`Error is found ${e}`);
        res.status(404).send("Error is found");
    }
});


router.get('/filter', async (req, res) => {
    try {
        // Extract filter criteria and sorting from query parameters
        const { author_name, year_of_publication, price, condition, sort } = req.query;

        // Create a filter object
        const filter = {};

        // Add filters conditionally based on provided query parameters
        if (author_name) {
            filter.author_name = author_name;
        }

        if (year_of_publication) {
            filter.year_of_publication = year_of_publication;
        }

        if (price) {
            filter.price = { $lte: Number(price) }; // Filter by price (less than or equal to)
        }

        if (condition) {
            filter.condition = condition;
        }

        // Create sorting options
        let sortOptions = {};
        if (sort) {
            const [field, order] = sort.split(':'); // Assuming format 'field:order' (e.g., 'price:asc' or 'book_name:desc')
            sortOptions[field] = order === 'desc' ? -1 : 1; // -1 for descending, 1 for ascending
        }

        // Query the database using the filter and sort options
        const filteredBooks = await Books.find(filter).sort(sortOptions);

        // Log and send the filtered data
        console.log(filteredBooks);
        res.status(200).json(filteredBooks);
    } catch (e) {
        console.log(`Error is found ${e}`);
        res.status(404).send("Error is found");
    }
});



router.post('/add', async (req, res) => {
    try{
        const data = bookSchema.parse(req.body);
        const response = new Books(data);
        const savedBooks = await response.save();
        console.log(savedBooks);
        res.status(200).json(savedBooks);
    }catch(e){
        res.status(404).json({Error: e.errors });
    }
})

router.put('/update', async (req, res) => {
    try{
        const data = req.body;
        const id = req.query.id;
        const response = await Books.findByIdAndUpdate(id, data, { new: true });
        console.log(response);
        if(!response){
            return res.status(404).send("Book Id is missing");
        }
        res.status(200).json({response});
    }catch(e){
        console.log(`Error is found ${e}`);
        res.status(404).send("Error is found");
    }
})

router.delete('/delete', async (req, res) => {
    try{
        const id = req.query.id;
        const response = await Books.findByIdAndDelete(id);
        console.log(response);
        if(!response){
            return res.status(404).send("Book Id is missing");
        }
        res.status(200).send("Data is Deleted");
    }catch(e){
        console.log(`Error is found ${e}`);
        res.status(404).send("Error is found");
    }
})

export default router;