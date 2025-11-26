const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6913945e789ae60a650e09c9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit aliquam ipsam accusamus hic illo voluptas veniam voluptatibus nam, officiis dolores quia officia magnam voluptatem saepe vel nulla dolore obcaecati? Officia.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dkq6bg9jg/image/upload/v1763567222/YelpCamp/uqlbdpckuj6r7lfoujlf.jpg',
                    filename: 'YelpCamp/uqlbdpckuj6r7lfoujlf'
                },
                {
                    url: 'https://res.cloudinary.com/dkq6bg9jg/image/upload/v1763567231/YelpCamp/yke9zlei0dfs8qcvhcrs.jpg',
                    filename: 'YelpCamp/yke9zlei0dfs8qcvhcrs'
                },
                {
                    url: 'https://res.cloudinary.com/dkq6bg9jg/image/upload/v1763567231/YelpCamp/z6rbi4xo2ello47n0aiz.jpg',
                    filename: 'YelpCamp/z6rbi4xo2ello47n0aiz'
                }
            ] 
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})