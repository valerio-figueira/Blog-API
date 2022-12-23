const router = require("express").Router();
const Products = require("../models/Products");
const Categories = require("../models/Categories");


// CREATE PRODUCT
router.post("/new-product", async (req, res) => {
    const {title, description, price, images, category} = req.body;
    const errors = [];

    if(typeof title == undefined || title == null || !title){
        errors.push({
            "error": "Title is empty."
        });
    } else if(typeof description == undefined || description == null | !description){
        errors.push({
            "error": "Description is empty."
        });
    } else if(typeof price == undefined || price == null || !price){
        errors.push({
            "error": "Price is empty."
        });
    } else if(typeof images == undefined || images == null || !images){
        errors.push({
            "error": "Images is empty."
        });
    } else if(typeof category == undefined || category == null || !category){
        errors.push({
            "error": "Category is empty."
        });
    } else{
        if(errors.length > 0){
            res.json({errors})
        } else{
            const product = {
                title,
                description,
                price,
                images,
                category
            }
    
            try{
                await Products.create(product);

                res.status(201).json({"message": "Product registered successfully"});
            } catch(error){
                res.status(500).json({error});
            }
                        
        }
    }

});

// CREATE CATEGORY
router.post("/new-category", async (req, res) => {
    const { category, slug } = req.body;
    const errors = [];

    if(typeof category == undefined || !category || category == null){
        errors.push({error: "Category is empty."});
    } else if(typeof slug == undefined || !slug || slug == null){
        errors.push({error: "Slug is empty."});
    }

    if(errors.length > 0){
        res.json(errors);
    } else{
        const newCategory = {
            category,
            slug
        }

        try{
            await Categories.create(newCategory);

            res.status(201).json({message: "Category registered successfully"});
        } catch (error){
            res.status(500).json({error: error});
        }
    }
})



// READ ALL



module.exports = router;