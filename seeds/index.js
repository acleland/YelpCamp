const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

const inTheWoodsCollectionID = 483251;
const unsplashURL = 'https://source.unsplash.com/collection/483251';

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
    const c = new Campground({title:"Dark Wood's Rest", 
    location: "The Dark Wood",
    image: 'https://static.wikia.nocookie.net/bogm/images/0/04/Darkwoods.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, beatae illum. Facere illum odio mollitia, quo repudiandae ducimus molestiae similique tempore minima ut, earum delectus at, illo facilis esse distinctio.',
    price: 0.00,
    author: '618c4bd25c9a435c2e51b0ff'
})
    await c.save();
    for (let i =0; i < 50; i++){
        let city = getRandom(cities);
        let descriptor = getRandom(descriptors);
        let place = getRandom(places);
        let price = Math.floor(Math.random()*22) + 5;
        const camp = new Campground({ 
            title: `${descriptor} ${place}`,
            location: `${city.city}, ${city.state}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, beatae illum. Facere illum odio mollitia, quo repudiandae ducimus molestiae similique tempore minima ut, earum delectus at, illo facilis esse distinctio.',
            price: price,
            author: '618c4bd25c9a435c2e51b0ff'
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})