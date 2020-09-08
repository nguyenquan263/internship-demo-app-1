module.exports = function(sequelize, Datatypes) {
    var Comment = sequelize.define('Info', {
        id: {
            type: Datatypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fullname: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        address: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        state: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        zip: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        email: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        phone: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        created_at: {
            type: Datatypes.DATE,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    return Comment;
}