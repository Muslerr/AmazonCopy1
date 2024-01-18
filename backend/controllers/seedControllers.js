import User from '../models/user.js';
import Product from '../models/Product.js';
import data from '../data.js';

const seedData = async(req,res) =>{
    User.deleteMany();
    Product.deleteMany();
    
    const users = await User.insertMany(data.users);
    const products = await Product.insertMany(data.products);
    res.send({users: users, products: products});
}

export default seedData;