const Product = require('../models/Product');

const { formatPrice, date } = require('../../lib/utils.js')


async function getImages(productId) {
            
    let files = await Product.files(productId)
    files = files.map(file => ({
        ...file,
        src:`${file.path.replace("public", "")}`
    }))

    return files

}

async function format(product) {
    
    const files = await getImages(product.id);
    product.img = files[0].src
    product.files = files
    product.formattedOldPrice = formatPrice(product.old_price)
    product.formattedPrice = formatPrice(product.price)

    const { day, minutes, hour, month } = date(product.updated_at)
    
    product.published = {
        day: `${day}/${month}`,
        hour: `${hour}h${minutes}`
    }

    return product

}


const LoadService = {
    load(service, filter) {
        this.filter = filter;
        return this[service]()
    },
    async product(){

        try {

            const product = await Product.findOne(this.filter);
            return format(product)

        } catch (err) {
            console.error(err);
        }

    },
    async products(){

        try {

            const products = await Product.findAll(this.filter);
            const productsPromise = products.map(format);
            return Promise.all(productsPromise)

        } catch (err) {
            console.error(err);
        }

    },

    async productWithDeleted() {
        try {
            let product = await Product.findOneWithDeleted(this.filter);
            return format(product)
        } catch (err) {
            console.error(err);
        }
    },
    format
}

module.exports = LoadService;