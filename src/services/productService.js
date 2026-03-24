import axios from 'axios';

async function fetchProducts() {
    try {
        const res = await axios.get(
            'https://fakestoreapi.com/products'
        );
        console.log(res.data);
        return res.data;
    } 
    catch (err) {
        console.log(err);
        return [];
    }
}

export default fetchProducts