import User from '../models/user.js';
import Product from '../models/Product.js';
import data from '../data.js';

const getProducts = async(req,res) =>{   
    const products = await Product.find();
    res.send(products);
}
const getProductById = async(req, res) => {
    
    console.log("ff");
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (product) {
        res.send(product);
    } else {
        res.status(400).send({ message: 'Product not found' });
    }
};

const getProductByToken=async (req, res) => {
    const {token}=req.params;
    const product = await Product.findOne({token:token});
    if (product) {
        res.send(product);
    } else {
        res.status(400).send({ message: 'Product not found' });
    }
}




export {getProducts,getProductById,getProductByToken};