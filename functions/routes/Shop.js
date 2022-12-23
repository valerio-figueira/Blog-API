const router = require("express").Router();
const Products = require("../models/Products");
const Categories = require("../models/Categories");


// CREATE PRODUCT
router.post("/new-product", async (req, res) => {
    res.json({"message": "Hello!"})
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