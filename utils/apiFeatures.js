class APIFeatures {
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filter (){
        //1a) filtering
       const queryObj = {...this.queryString};//tạo một bản sao của đối tượng req.query bằng cách sử dụng cú pháp spread (...). Điều này sẽ tạo một đối tượng mới có cùng các thuộc tính và giá trị với req.query.
       const excludedFields = ['page','sort','limit','fields'];//khởi tạo một mảng excludedFields chứa các tên trường mà bạn muốn loại bỏ khỏi đối tượng queryObj.
       excludedFields.forEach(el=>delete queryObj[el]);//vòng lặp forEach được sử dụng để lặp qua từng phần tử trong mảng excludedFields. Trong mỗi lần lặp, delete queryObj[el] được sử dụng để xóa thuộc tính tương ứng với giá trị el khỏi đối tượng queryObj. Điều này sẽ loại bỏ các trường được xác định trong excludedFields khỏi queryObj.
       
       //1b) advanced filtering
       let querystr = JSON.stringify(queryObj);//chuyển đổi đối tượng queryObj thành một chuỗi JSON
       querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g,math=>`$${math}`);//sử dụng phương thức replace() kết hợp với biểu thức chính quy (regular expression) để thay thế các từ khóa gte, gt, lte, lt trong querystr bằng các chuỗi $gte, $gt, $lte, $lt
       //console.log(JSON.parse(querystr));
        this.query=this.query.find(JSON.parse(querystr));
        return this; // return cả nguyên 1 đối tượng, nó cần thiết cho chainning phương thức
    }
    sort(){
        if(this.queryString.sort){// nếu có yêu cầu sắp xếp (req)
            const sortBy = this.queryString.sort.split(',').join(' ');
            //console.log(sortBy);
            this.query = this.query.sort(sortBy);//sắp xếp theo yêu cầu đưa ra
        }
        return this;
    }
    limitFields (){
        if(this.queryString.fields){// giới hạn thông tin dc xuất cho ng dùng xem
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
           }else{
            this.query = this.query.select('-__V');// xuất thông tin trừ cái __v
        }
        return this;
    }
    paginate () {
        const page = this.queryString.page*1||1;
       const limit = this.queryString.limit*1||100;
       const skip = (page - 1)*limit;
       //vd page 1: 1-10, page 2: 11-20, page 3: 21-30
       this.query=this.query.skip(skip).limit(limit);
    //    if(this.queryString.page){
    //     const Numbertours = await Tour.countDocuments(); // điếm số dòng dữ liệu
    //     if(Numbertours<=skip){
    //         throw new Error('this page no exist');
    //     }
    //    }
       return this;
    }
}

module.exports = APIFeatures;