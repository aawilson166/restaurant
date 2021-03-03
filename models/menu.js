const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema(
    {
        name: String,
        price: String,
        description: String,
        image: {type: String, default: 'https://www.iphonetechnicians.com/wp-content/uploads/2020/10/image-coming-soon-placeholder.png'}
    }
)

const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu