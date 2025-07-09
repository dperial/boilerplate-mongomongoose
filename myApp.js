require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

mongoose.connection.on('error', (err) => console.log('connection error', err));
let Person;
// Create a Person Schema personSchema
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
// Create a Model from the Schema
Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  // Create an instance from a mongoose Schema personSchema
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Pasta"]
  });
  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err, 'Error finding peoples by name');
    if (data.length === 0) return done(null, 'No people found with that name');
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if(err) return done(err, 'Error finding person by food');
    if (!data) return done(null, 'No person found with that food');
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById( personId, (err, data) => {
    if(err) return done(err, 'Error finding person by ID');
    if (!data) return done(null, 'No person found with that ID');
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, person) => {
    if (err) return done(err, 'Error finding person to edit');
    if (!person) return done(null, 'No person found with that ID');

    // Add food to favoriteFoods array
    person.favoriteFoods.push(foodToAdd);
    
    // Save the updated person
    person.save((err, updatedPerson) => {
      if (err) return done(err, 'Error saving updated person');
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  findPeopleByName(personName, (err, people) => {
    if (err) return done(err, 'Error finding people to update');
    if (people.length === 0) return done(null, 'No people found with that name');

    // Update the age of each person found
    people.forEach(person => {
      person.age = ageToSet;
      person.save((err, updatedPerson) => {
        if (err) return done(err, 'Error saving updated person');
        done(null, updatedPerson);
      });
    });
  });
};

const removeById = (personId, done) => {
  findPersonById(personId, (err, person) => {
    if (err) return done(err, 'Error finding person to remove');
    if (!person) return done(null, 'No person found with that ID');
    person.remove((err, data) => {
      if (err) return done(err, 'Error removing person');
      done(null, data);
    });
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
