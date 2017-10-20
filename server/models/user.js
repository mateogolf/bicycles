var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment'),
    bcrypt = require('bcrypt'),
    uniqueValidator = require('mongoose-unique-validator'),
    // Schema = mongoose.Schema,
    UserSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        minlength: 2,
        required: [true, 'Your first name must be at least 2 characters'] 
    },
    last_name: { 
        type: String,
        minlength: 2,
        required: [true, 'Your last name must be at least 2 characters'] 
    },
    email: {
        type: String,
        required: [true, 'EMAIL REQUIRED'] ,
        unique: true,
        validate: {
            validator: function (value) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: "This is not a valid email"
        }
    },
    password: { 
        type: String, 
        minlength:8,
        required: [true, 'Password must be 8 characters long'] 
    },
    password_confirmation: {
        type: String, required: [true, "Password confirmation must not be empty"], validate: {
            validator: function (value) {
                return value == this.password;
            },
            message: "Password and password confirmation must match"
        }
    },
    birthday: {
        type:Date,
        required: [true, 'Birthday REQUIRED'],
        validate: {
            validator: function (value) {
                if(!(value instanceof Date)){
                    return false;
                }
                let now = moment().toDate();
                if(now<value){
                    console.log("input date is after now")
                    return false;
                }
                return true;
            },
            message: "Not a valid Date before today."
        }
    },
    bikes: [{ type: Schema.Types.ObjectId, ref: 'Bike' }]


}, { timestamps: true });
UserSchema.plugin(uniqueValidator);
// UserSchema.methods.login = function (passTry){
//     const self = this;
//     return new Promise((resolve,reject)=>{
//         bcrypt.compare(passTry,self.password,(err,ok)=>{
//             if(!ok){
//                 reject({message: "Passwords don't match"})
//                 return
//             }
//             resolve() 
//         });
//     });
// }
// UserSchema.pre('save',function(next){
//     let self=this;
//     bcrypt.hash(self.password,14,function(err,hashed_password){
//         if(err){
//             next(err)
//         }
//         self.password = hashed_password;
//         self.password_confirmation = undefined;
//         next();
//     })
// })
UserSchema.methods.hash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(14));
}

UserSchema.methods.match = function (formPass, password) {
    return bcrypt.compareSync(formPass, password);
}

UserSchema.pre("save", function (done) {
    console.log('pre');
    this.password = this.hash(this.password);
    this.password_confirmation = undefined;
    done();
})
mongoose.model('User', UserSchema);