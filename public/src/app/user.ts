export class User {
    public _id;
    public bikes;
    constructor(
        public first_name: String="",
        public last_name: String="",
        public email: String="",
        public password: String="",
        public password_confirmation: String="",
        public birthday: Date=null,
        // public bikes: Object[]=[],
    ){
        this.first_name = first_name;
        this.last_name=last_name;
        this.email=email;
        this.password=password;
        this.password_confirmation = password_confirmation;
        this.birthday = birthday;
    }
}
