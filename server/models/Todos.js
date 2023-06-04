module.exports = (sequelize , DataTypes) => {
    const Todos = sequelize.define('todos' , {

        title : {
            type : DataTypes.STRING , 
            allowNull : false
        } ,
        status : {
            type : DataTypes.STRING , 
            allowNull : false
        } 
        
    })

    return Todos
}