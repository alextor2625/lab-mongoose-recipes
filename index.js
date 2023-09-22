const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Homemade Pizza & Pizza Dough',
      level: 'Amateur Chef',
      ingredients: [
      '1 1/2 cups (355 ml) warm water (105°F-115°F)',
      '1 package (2 1/4 teaspoons) active dry yeast',
      '3 3/4 cups (490g) bread flour',
      '2 tablespoons extra virgin olive oil (omit if cooking pizza in a wood-fired pizza oven)',
      '2 teaspoons kosher salt',
      '1 teaspoon sugar'],
      cuisine: 'Italian',
      dishType: "main_course",
      image: 'https://www.simplyrecipes.com/thmb/CWzxvl8dpC_zkjjRqEE6fBCS6DQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg',
      duration: 150,
      creator: 'Elise Bauer'
    })
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(recipe => { console.log(recipe) })
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { duration: 100 })
  })
  .then(updated => console.log(updated))
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(() => console.log('Delete Successful'))
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.connection.close()
    console.log('Success... Closing')
  })
