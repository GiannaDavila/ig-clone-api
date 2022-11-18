import { FieldValue } from "firebase-admin/firestore";
import dbConnect from "./dbConnect.js";
export async function getAllPhotos (req,res){
    const db = dbConnect();
    const collection = await db.collection('photos') .get()
    .catch (err => res.status(500).send(err))
    const photos = collection.docs.map(doc => ({...doc.data(), photoId: doc.id}));//1.info in the data 3. the random number id name 2.name for this 
    res.send(photos);

}
export async function addNewPhotos (req,res){
    const newPhoto = req.body;
    const db = dbConnect();
    await db.collection('photos').add(newPhoto)
    .catch(err => res.status(500).send(err));
    getAllPhotos(req,res); 
}
export async function addLike (req, res){
    const {photoId} = req.params 
    const db = dbConnect();
    await db.collection('photos').doc(photoId)
    .update({likes: FieldValue.increment(1)})
    .catch(err => res.status(500).send(err));
    getAllPhotos(req,res)

}

