class AIPFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  //{{DOMAIN}}/api/products?keyword=jeanswest
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // Do a case-insensitive serch for "is":
          },
        }
      : {}
    //console.log(keyword)
    this.query = this.query.find({ ...keyword })
    return this
  }

  //{{DOMAIN}}/api/products?keyword=jeanswest&price[gte]=1&price[lte]=100
  filter() {
    const queryCopy = { ...this.queryStr }
    //console.log(queryCopy)

    //Removing fields from the query i.e is our moongose there is no keyword filed and limit
    // where limit is work on pagaination
    //{ keyword: 'jeanswest', category: 'Cloth' }
    //{ category: 'Cloth' }
    const removeFileds = ["keyword", "limit", "page"]
    removeFileds.forEach((el) => delete queryCopy[el])
    console.log(queryCopy)

    // Suppose if we need product between price (200 to 1000)
    //Advance filter for price, ratings etc...

    let queryStr = JSON.stringify(queryCopy) //  queryCopy is object that why we have to covert into string

    //{ price: { gte: '1', lte: '100' } }
    // gte & lte is moongose operator so that we have put $ assignee
    //we have just $ before gte & lte
    queryStr = queryStr.replace(/\b(gt|gte|lte|lte)\b/g, (match) => `$${match}`)
    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  pagination(perPage) {
    const currentPage = Number(this.queryStr.page) || 1
    const skip = perPage * (currentPage - 1) // 4 * (2-1) = 4 and Total is 20
    this.query = this.query.limit(perPage).skip(skip) // skip 4 and show from 5-8
    return this
  }
}

module.exports = AIPFeatures
