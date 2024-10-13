const mongoose = require ("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema ({
    name : {type : String , required : true},
    email :{type : String , required : true , unique : true},
    password : {type : String , required : true},    
})

const adminSchema = new schema({
    name : {type : String , required : true} ,
    email: {type : String , required : true , unique : true} ,
    password : {type : String , required : true}
})

const courseSchema = new schema({
    title : {type : String , required : true} ,
    description: String ,
    price : Number ,
    imageUrl : String,
    creatorId :{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
})

const purchaseCourseSchema = new schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'Users'}  ,
    courseId : { type: mongoose.Schema.Types.ObjectId, ref: 'Courses' } ,
})


const UserModel = mongoose.model("Users" , userSchema);
const AdminModel = mongoose.model("Admin" , adminSchema);
const CourseModel = mongoose.model("Courses" , courseSchema);
const PurchaseModel = mongoose.model("Purchases" , purchaseCourseSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}