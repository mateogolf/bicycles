
export class Bicycle {
    public _id;
    public _user;
    constructor(
        // public _id: string = "",
        public title:String="",
        public description:String="",
        public price:Number=0,
        public location:String="",
        public image_url: String="",
        // public _user:Object=null,
    ){
        this.title=title;
        this.description=description;
        this.price=price;
        this.location=location;
        this.image_url=image_url;
    }
}
