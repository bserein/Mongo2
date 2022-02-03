const mongodb = require('mongodb');
const dotenv= require('dotenv'); //need to add npm i dotenv to use the .env library
const express = require('express');

dotenv.config(); // this loads the env file

const app = express();
app.use(express.json())

const client = new mongodb.MongoClient(process.env.MONGO_URL); //use this call from the env file 


const connectClient = async () => { 
    await client.connect(); 
    console.log('Client Connected!') 
};
                                                                    
                                 
const getUserCollection = () => { 
    const db = client.db('brians3-db');
    const col = db.collection('users');

    return col; 
};

const getProductCollection = () => { 
    const db = client.db('brians3-db');
    const col = db.collection('product');

    return col; 
};

const getOrderCollection = () => {
    const db = client.db('brians3-db');
    const col = db.collection('orders')

    return col;
}


const insertUser = async (user) => {  
    const col = getUserCollection();
    await col.insertOne({user})
    console.log('User Inserted!')
}

const insertProduct = async (product) => { 
    const col = getProductCollection();
    await col.insertOne({product})
    console.log('Product Inserted!')
}

const insertOrder = async (order) => {
    const col = getOrderCollection();
    await col.insertOne({order})
    console.log('Order Inserted!')
}

const getUsers = async () => { 
    const col =  getUserCollection(); 
    const users = await col.find({}).toArray();

    return users;
}

const getProduct = async () => { 
    const col = getProductCollection(); 
    const product = await col.find({}).toArray();

    return product;
}

const getOrder = async () => { 
    const col = getOrderCollection(); 
    const order = await col.find({}).toArray();

    return order;
}



app.get('/user', async (request, response) => {
    console.log("calling getUsers")
    const users = await getUsers() 
    
    response.send(users)
  })
  
app.get('/product', async (request, response) => {
    console.log("calling getProduct")
    const product = await getProduct()
    response.send(product)
  })
  
app.get('/order', async (request, response) => {
    console.log("calling getOrder")
    const order = await getOrder()
    response.send(order)
  })
  
app.post('/user', async (request,response) => {
    const user = request.body
    await insertUser(user)
    response.send("user created")
})

app.post('/product', async (request,response) => {
    const product = request.body
    await insertProduct(product)
    response.send("product created")
})

app.post('/order', async (request,response) => {
    const order = request.body
    await insertOrder(order)
    response.send("order created")
})

  
  app.listen(3000, () => {
    console.log('API listening on port 3000')
  })

  connectClient().then()