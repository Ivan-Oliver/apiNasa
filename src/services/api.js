const mongoose = require('mongoose');

mongoose.set('strictQuery', true)

mongoose.connect('mongodb://localhost:27017/task_db', { useNewUrlParser: true });

const Data = require('../models/nasa')

async function getApi() {
    try {
        console.log('EJECUTANDO GET API')

        const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=q5Zpr0joiCIaTP1fTatAGhlXDQuFlTAEItFN3bV8')
        const roversList = await response.json()

        const roverPhoto = roversList.photos

        const newList = roverPhoto.map(rover => (
            {
                idNasa: rover.id,
                camera: rover.camera,
                img_src: rover.img_src,
                earth_date: rover.earth_date
            }));

        //Probamos aquí el código para controlar documentos duplicados
        const itemsToCreate = [];
        const existedItems = await Data.find();
        for (const item of newList) {
            const existed = existedItems.find((existedItem) => existedItem.idNasa === item.idNasa)
            if (!existed) {
                itemsToCreate.push(item)
            }
        }
        if (itemsToCreate.length > 0) {
            await Data.insertMany(itemsToCreate);
            console.log('DATOS GUARDADOS EN LA BASE DE DATOS');
        }
        
        //return [...existedItems, ...itemsToCreate]
        return existedItems.concat(itemsToCreate);
    } catch (error) {
        console.log(error);
    }
}

module.exports = getApi;

