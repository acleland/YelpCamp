const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

function getRandom(array) {
    return array[Math.floor(Math.random()*array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    const c = new Campground({title:"Dark Wood's Rest", location: "The Dark Wood"})
    await c.save();
    for (let i =0; i < 50; i++){
        let city = getRandom(cities);
        let descriptor = getRandom(descriptors);
        let place = getRandom(places);
        const camp = new Campground({ 
            title: `${descriptor} ${place}`,
            location: `${city.city}, ${city.state}`,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})