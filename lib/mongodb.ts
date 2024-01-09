import mongoose from 'mongoose';

const connectMongoDb = async () =>{

try {
    await mongoose.connect('mongodb://localhost:27017/users')
console.log('connected to db')
} catch (error) {
    console.log('rerror with connection', error)
}
}

export default connectMongoDb