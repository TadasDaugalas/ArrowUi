import HTTP from "./index";

const getProducts = () => HTTP.get('/products');
const createProducts = (data) => HTTP.post('/products', data);
const getProductById = (id) => HTTP.get(`/products/${id}`);
const updateProduct = (data) => HTTP.put(`/products`, data);
const deleteProduct = (id) => HTTP.delete(`/products/${id}`);

const uploadProductImage = (id, image) => {
    let data = new FormData();
    data.append('multipartFile', image, image.name);
    return HTTP.post(`/files/blobs/${id}`, data, {
        headers: {'content-type': `multipart/form-data; boundary=${data._boundary}`}
    });
};

export {getProducts, createProducts, getProductById, updateProduct, uploadProductImage, deleteProduct};