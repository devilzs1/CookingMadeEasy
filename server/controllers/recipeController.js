require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

exports.homepage = async (req, res) => {
    try{
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber)
        const latestRecipes = await Recipe.find({}).sort({_id:-1}).limit(limitNumber)

        const Indian = await Recipe.find({'category':'Indian'}).limit(limitNumber);
        const American = await Recipe.find({'category':'American'}).limit(limitNumber);
        const Chinese = await Recipe.find({'category':'Chinese'}).limit(limitNumber);
        const Mexican = await Recipe.find({'category':'Mexican'}).limit(limitNumber);
        const Thai = await Recipe.find({'category':'Thai'}).limit(limitNumber);


        const food = {latestRecipes, Indian, Chinese, Thai, American};

        res.render("index", { title: "Cooking made easy - Home", categories, food});
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
};

//Explore Categories - GET /categories
exports.exploreCategories = async (req, res) => {
    try{
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber)

        res.render("categories", { title: "Cooking made easy - Categories", categories});
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
};

// Explore Recipe - GET /recipe
exports.exploreRecipe = async (req, res) => {
    try{
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        res.render("recipe", { title: "Cooking made easy - Recipe",recipe});
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
};


//Explore recipe by id - GET 
exports.exploreCategoriesById = async (req, res) => {
  try {
    const limitNumber = 20;
    let categoryId = req.params.id;
    const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber);

    res.render("categories", {
      title: "Cooking made easy - Categories",
      categoryById,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};


//Search recipe - POST /search
exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({$text: {$search: searchTerm, $diacriticSensitive: true}});
    res.render("search", {
      title: "Cooking made easy - Search", recipe});
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};


//Explore latest - GET /explore-latest
exports.exploreLatest = async (req, res) => {
    try{
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
        res.render("explore-latest", { title: "Cooking made easy - Explore Latest Recipe",recipe});
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
};

// Explore Random Recipes as JSON - GET /explore-random 
exports.exploreRandom = async (req, res) => {
    try{
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random*count);
        let recipe = await Recipe.findOne().skip(random).exec();
        res.render("explore-random", { title: "Cooking made easy - Random Recipe",recipe});
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
};


// Submit recipe - GET /submit-recipe
exports.submitRecipe = async (req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render("submit-recipe", { title: "Cooking made easy - Submit Recipe", infoErrorsObj, infoSubmitObj});
};

// Submit recipe - POST /submit-recipe
exports.submitRecipeForm = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No files were uploaded");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;
      uploadPath =
        require("path").resolve("./") + "/public/uploads/" + newImageName;
      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName,
    });

    await newRecipe.save();
    req.flash("infoSubmit", "Recipe has been added"); 
    res.redirect("/submit-recipe");
  } catch (error) {
    req.flash("infoErrors", error.message); 
    res.redirect("/submit-recipe");
  }
};


//Update Recipe
// async function updateRecipe(){
//     try{
//         const res = await Recipe.updateOne({name:''},{name: ''});
//         res.n;
//         res.nModified;
//     }catch(error){
//         console.log(error);
//     }
// }
// updateRecipe();

//Delete Recipe
// async function deleteRecipe(){
//     try{
//         await Recipe.updateOne({name:''});
//     }catch(error){
//         console.log(error);
//     }
// }
// deleteRecipe();

