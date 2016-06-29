/*****************************************

 文章管理
 author: 张鹏
 date: 2016-06-22
 
 draft: 草稿
*****************************************/

var Article = sequelize.define('article', {
    title: {
        type: Sequelize.STRING,
        field: 'title'
    },
    sub_title: {
        type: Sequelize.STRING,
        field: 'sub_title'
    },
    author: {
        type: Sequelize.STRING,
        field: 'author'
    },
    content: {
        type: Sequelize.TEXT,
        field: 'content'
    },
    cover_image: {
        type: Sequelize.STRING,
        field: 'cover_image'
    },
    cover_desc: {
        type: Sequelize.STRING,
        field: 'cover_desc'
    },
    view_count: {
        type: Sequelize.BIGINT,
        field: 'view_count'
    },
    draft: {
        type: Sequelize.BOOLEAN,
        field: 'draft'
    }
}, {
    freezeTableName: true
})