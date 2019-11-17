/* 
    封装操作数据通用API
*/
const mysql = require('mysql');

exports.base = (sql, data, callback) => {
    //创建数据库
    const connection = mysql.createConnection({
        host: 'localhost', //数据库所在服务器的域名或者ip地址
        user: 'root', //登录数据库的账号
        password: '', //密码
        database: 'book' //数据库的名称
    });
    //连接数据库
    connection.connect();

    //操作数据库 也是异步的
    connection.query(sql, data, function(err, results, fields) {
        if (err) throw err;
        callback(results);
    });
    //关闭数据库
    connection.end();
};