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

const courseContentSchema = new schema ({
        title: { type: String, required: true },           
        description: { type: String },                     
        contentType: { type: String, enum: ['video', 'quiz', 'document', 'text'], required: true },  
        videoUrl: { type: String },                        
        documentUrl: { type: String },                     
        order: { type: Number },                           
        duration: { type: Number },                        
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true },  
        createdAt: { type: Date, default: Date.now },      
    });
    


const UserModel = mongoose.model("Users" , userSchema);
const AdminModel = mongoose.model("Admin" , adminSchema);
const CourseModel = mongoose.model("Courses" , courseSchema);
const PurchaseModel = mongoose.model("Purchases" , purchaseCourseSchema);
const CourseContentModel = mongoose.model("CourseContent" , courseContentSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel,
    CourseContentModel
}