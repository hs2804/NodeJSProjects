class APIFeatures {

    constructor(query, queryString){
     this.query = query;
     this.queryString = queryString;
    }

  filter() {
  let queryObject = {...this.queryString};
  const excludeKeyWords = ['sort','limit','fields','page'];
  excludeKeyWords.forEach(el => delete queryObject[el]);

  // 1B) Advanced Filtering
  let queryStr = JSON.stringify(queryObject);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  this.query = this.query.find(JSON.parse(queryStr));
   
  return this;
  }
  sort(){
    if(this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      }else{
        this.query = this.query.sort('-createdAt') //Descending Order by default
      }
      return this;
  }

  limitFields() {
    if(this.queryString.fields) {
        const fields = this.queryStrig.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      }else{
        this.query = this.query.select('-__v');//To remove __v created by MongoDB
      }
      return this;
  }

  paginate(){
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    //console.log(`*************** ${page}*****${limit}`);
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;