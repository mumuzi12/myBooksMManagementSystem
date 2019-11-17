/* 
    resful api
    是从url的格式来描述的
    resful风格
    get http://localhost:3000/books
    get http://localhost:3000/books/book 添加
    post http://localhost:3000/books/book 提交表单
    get http://localhost:3000/books/book/1 编辑
    put http://localhost:3000/books/book 提交表单
    delete  http://localhost:3000/books/book/3  删除
*/
const express = require('express');
const service = require("./service");
const router = express.Router();

//提供所有图书的信息
router.get('/books', service.allBooks);

//添加图书的信息的提交数据
router.post('/books/book', service.addBook);

//编辑图书时根据id查询对应的信息
router.get('/books/book/:id', service.getBookById);
//提交编辑的数据
router.put('/books/book', service.editBook);
//删除图书信息
router.delete('/books/book/:id', service.deleteBook);
// 查询天气
router.get('/weather/:id', service.queryWeather);

module.exports = router;