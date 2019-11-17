$(function() {
    //初始化数据列表
    function initList() {
        //渲染页表数据
        $.ajax({
            type: 'get',
            url: '/books',
            dataType: 'json',
            success: function(data) {
                //渲染数据列表
                let html = template('indexTpl', {
                    list: data
                });
                $("#dataList").html(html);
                //必须在渲染完成之后才能操作dom标签

                $('#dataList').find('tr').each(function(index, element) {
                    let td = $(element).find('td:eq(5)');
                    let id = $(element).find('td:eq(0)').text();
                    //绑定编辑图书单击事件
                    td.find('a:eq(0)').click(function() {
                        editBook(id);
                    });
                    //删除图书单击事件
                    td.find('a:eq(1)').click(function() {
                        deleteBook(id);
                    });

                    //绑定添加图书的信息的单击事件
                    addBook();

                    //操作完成表单后，重置表单
                    let form = $('#addBookForm');
                    form.get(0).reset();
                    form.find('input[type=hidden]').val('');
                });

            }
        });
    }
    initList();
    //删除图书信息
    function deleteBook(id) {
        $.ajax({
            type: 'delete',
            url: '/books/book/' + id,
            dataType: 'json',
            success: function(data) {
                //删除图书之后重新渲染列表
                if (data.flag == 1) {
                    initList();
                }
            }
        });
    }

    //编辑图书信息
    function editBook(id) {
        //根据id查询最新的数据
        $.ajax({
            type: 'get',
            url: '/books/book/' + id,
            dataType: 'json',
            success: function(data) {
                let form = $('#addBookForm');
                //初始化一个弹窗
                let mark = new MarkBox(600, 400, '编辑图书', form.get(0));
                mark.init();
                //填充表单数据
                form.find('input[name=id]').val(data.id);
                form.find('input[name=name]').val(data.name);
                form.find('input[name=author]').val(data.author);
                form.find('input[name=category]').val(data.category);
                form.find('input[name=description]').val(data.description);
                //给提交按钮重新绑定单击事件
                //先解绑之前绑定的事件再绑定
                form.find('button').unbind('click').click(function() {
                    //编辑完成之后重新提交
                    $.ajax({
                        type: 'put',
                        url: '/books/book',
                        data: form.serialize(),
                        dataType: 'json',
                        success: function(data) {
                            if (data.flag == '1') {
                                //隐藏弹窗
                                mark.close();
                                //重新渲染数据列表
                                initList();
                            }
                        }
                    })
                });

            }

        });

    }

    //添加图书信息
    function addBook() {
        //添加图书信息
        $("#addBookId").click(function() {
            let form = $('#addBookForm');
            //实例化弹窗
            let mark = new MarkBox(600, 400, '添加图书', form.get(0));
            mark.init();
            form.find('button').unbind('click').click(function() {
                $.ajax({
                    type: 'post',
                    url: '/books/book',
                    data: form.serialize(),
                    dataType: 'json',
                    success: function(data) {
                        if (data.flag == '1') {
                            //关闭弹窗
                            mark.close();
                            //添加成功之后重新渲染列表
                            initList();
                        }
                    }
                });
            });
        });
    }
    // 查询天气
    $('#weather').click(function() {
        var cityCode = $('select option:selected').val();
        $.ajax({
            type: 'get',
            url: '/weather/' + cityCode,
            dataType: 'json',
            success: function(data) {
                var html = template('weatherTpl', data.info);
                var mark = new MarkBox(600, 400, '天气信息', $(html).get(0));
                mark.init();
            }
        });
    });


});