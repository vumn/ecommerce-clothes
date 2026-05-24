import {v2 as cloudinary} from 'cloudinary'
import Product from '../models/Product.js'

// add product
const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, subCategory, sizes, bestSeller} = req.body;
        // const sizeArray = JSON.parse(sizes);

        const image1 =req.files.image1 && req.files.image1[0];
        const image2 =req.files.image2 && req.files.image2[0];
        const image3 =req.files.image3 && req.files.image3[0];
        const image4 =req.files.image4 && req.files.image4[0];
        
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url;
            })
        )

        const productData = {
            name, 
            description,
            category,
            subCategory,
            price: Number(price),
            bestSeller: bestSeller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        } 

        console.log(productData);

        const product = new Product(productData);
        await product.save();

        res.json({success:true, message: "Product Added"});
    }
    catch (error) { 
        res.json({success:false, message:error.message});
        console.error("Error in addProduct", error);
    }

}

const listProduct = async(req, res) => {

    try {
        const products = await  Product.find({});
        res.json({success: true, products});
    }   
    catch (error) {
        res.json({success:false, message:error.message});
        console.error("Error in listProduct", error);
    }

}

const singleProduct = async(req, res) => {

    try {
        const {productId} = req.body;
        const product = await Product.findById(productId);
        res.json({success:true, product})
    } catch (error) {
        res.json({success:false, message:error.message});
        console.error("Error in singleProduct", error);
    }
    

}

const removeProduct = async(req, res) => {

    try {
        await Product.findByIdAndDelete(req.body.id);
        res.json({success:true, message: "Product removed"});
    } catch (error) {
        res.json({success:false, message:error.message});
        console.error("Error in removeProduct", error);
    }

}

const updateProduct = async(req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        if (!id) {
            return res.json({ success: false, message: "Vui lòng cung cấp ID sản phẩm cần sửa" });
        }

        // Tạo một object rỗng để chứa dữ liệu cần update
        let updateData = {};

        // Chỉ đưa vào object những trường có giá trị (không bị undefined)
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (category) updateData.category = category;
        if (subCategory) updateData.subCategory = subCategory;
        
        if (price) updateData.price = Number(price);
        
        // Xử lý bestSeller (kiểm tra chuẩn xác cả dạng chuỗi và boolean)
        if (bestSeller !== undefined) {
            updateData.bestSeller = bestSeller === "true" || bestSeller === true;
        }

        // Xử lý parse mảng sizes an toàn
        if (sizes) {
            try {
                updateData.sizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
            } catch (err) {
                return res.json({ success: false, message: "Định dạng sizes không hợp lệ." });
            }
        }

        // Thực hiện update
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true } // Trả về data mới sau khi cập nhật
        );

        if (!updatedProduct) return res.json({ success: false, message: "Không tìm thấy sản phẩm" });
        
        res.json({ success: true, message: "Cập nhật thành công", product: updatedProduct });

    } catch (error) {
        res.json({ success: false, message: error.message });
        console.error("Error in updateProduct", error);
    }
}

export {listProduct, addProduct, removeProduct, singleProduct, updateProduct}