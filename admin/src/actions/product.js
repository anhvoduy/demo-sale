import aws from '../services/aws';
import CONSTANTS from '../utils/constants';
const { GET_PRODUCT_LIST, GET_PRODUCT_ITEM, CREATE_PRODUCT, UPDATE_PRODUCT } = CONSTANTS;

export const getProductList = function() {
    return (dispatch) => {
        return aws.get('/product/list')
        .then((res) => {
            let { products } = res.data;
            dispatch({ 
                type: GET_PRODUCT_LIST, 
                payload: products 
            });
            return res;
        })
        .catch((err) => {
            throw err;
        });
    };
};

export const getProductItem = function(id) {
    return (dispatch) => {
        return aws.get(`/product/${id}`)
        .then((res) => {
            let { product } = res.data;
            dispatch({ 
                type: GET_PRODUCT_ITEM, 
                payload: product
            });
            return res;
        })
        .catch((err) => {
            throw err;
        });
    };
};

export const addProduct = (data) => {
    return (dispatch) => {
        return aws.post('/product/create', data)
        .then((res) => {
            let { product } = res.data;
            dispatch({
                type: CREATE_PRODUCT, 
                payload: product
            });
            return res;
        })
        .catch((err) => {
            throw err;
        });
    };
};

export const editProduct = (data) => {
    return (dispatch) => {
        return aws.put('/product/update', data)
        .then((res) => {
            let { product } = res.data;
            dispatch({
                type: UPDATE_PRODUCT, 
                payload: product
            });
            return res;
        })
        .catch((err) => {
            throw err;
        });
    };
};

export const updateProductImage = (id, image) => {
    return new Promise(function(resolve, reject) {
        return aws.put('/product/image/update', {id, image})
        .then((res) => {
            let { product } = res.data;
            resolve(product);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

export const uploadProductImage = (selectedFile) => {
    let { name: fileName, type: fileType } = selectedFile;
    return new Promise(function(resolve, reject) {
        aws.post('product/image/signurl',{
            fileName : fileName,
            fileType : fileType
        })
        .then(response => {
            let returnData = response.data.returnData;
            let { signedRequest, url } = returnData;
            let options = {
                headers: { 'Content-Type': fileType }
            };
            
            aws.put(signedRequest, selectedFile, options)
            .then(result => {
                resolve({ result, signedRequest, url });
            })
            .catch(error => {
                reject(error);
            });
        })
        .catch(error => {
            reject(error);
        });
    });
};