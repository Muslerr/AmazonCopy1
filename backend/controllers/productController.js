import User from '../models/user.js';
import Product from '../models/Product.js';
import data from '../data.js';

const getProducts = async(req,res) =>{   
    const products = await Product.find();
    res.send(products);
}

export default getProducts;