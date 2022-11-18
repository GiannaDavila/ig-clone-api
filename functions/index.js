import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { getAllPhotos, addNewPhotos, addLike } from './src/photo.js';

const app = express();
app.use(cors());
app.use(express.json());//any time we do anything other than .get 

//routes here ....
app.get('/photos', getAllPhotos);  //get all photos
app.post('/photos', addNewPhotos); //add new photos
app.patch('/photos,:photoId', addLike)

export const api = functions.https.onRequest(app);
