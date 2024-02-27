const mongoose=require('mongoose');

const url="mongodb+srv://deepakkc4422:0pFwPOqTa5kunJcI@notebook.ldbuyou.mongodb.net/?retryWrites=true&w=majority&appName=Notebook"


try{
    mongoose.connect(url);
    console.log("Connected successfully");
}
catch(err)
{
    console.log(err);
    console.log("Failed to connect");
}