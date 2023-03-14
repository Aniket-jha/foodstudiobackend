const mongoose = require('mongoose');

const password = process.env.DB_PASSWORD

const connectDB = async () => {
// mongoose.connect(process.env.DB_URL, ).then((data)=>{
//     console.log(`Mongodb connected with server : ${data.connection.host}` );
// })

   mongoose.connect(`mongodb+srv://foodstudiofficial:FoodStudio123@cluster0.d1yzzqo.mongodb.net/?retryWrites=true&w=majority`, ).then((data)=>{
    console.log(`Mongodb connected with server : ${data.connection.host}` );
})
}
module.exports=connectDB;
