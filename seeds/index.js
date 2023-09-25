
const mongoose = require('mongoose');
// const methodOverride = require('method-override');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})
const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dkhxwosvd/image/upload/v1694634875/YelpCamp/nwctga0dozuf12hh1bdw.jpg',
                    filename: 'YelpCamp/nwctga0dozuf12hh1bdw',
                },
                {
                    url: 'https://res.cloudinary.com/dkhxwosvd/image/upload/v1694634875/YelpCamp/re3z1idewfqu3stg8isf.jpg',
                    filename: 'YelpCamp/re3z1idewfqu3stg8isf',
                }
            ],
            price,
            author: '64fdfd958604ddfff905a906'

        });
        await camp.save();
    }

}

seedDb().then(() => {
    mongoose.connection.close();
})