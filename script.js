// useful variables
var brands =[]
var productTypes = []
var body = document.getElementById('app');
var div = ()=>document.createElement('div')
 var img = ()=> document.createElement('img')
var navList = document.getElementById('navList')
//fetch the api
async function fetchApi(){
  try{  console.log('fetching')
   var fetched = await fetch('products.json')
   var fetchedData = await fetched.json()
   filterBrand(fetchedData)}
   catch{
    console.warn('error occurs')
}
   return fetchedData
}

fetchApi();



function filterBrand(data){
    console.log(data);

    //getting brand name
     data.map(data=> brands.push(data.brand))
    brands = [...new Set(brands)]
    console.log(brands)

    //getting product type
 data.map(data=> productTypes.push(data.product_type))
 productTypes = [...new Set(productTypes)]

   var getData = (val) => data.filter(data => data.product_type == val )


   //display products


   productTypes.forEach(product =>{

 //nav bar lists   
{/* <li class="nav-item ">
        <a class="nav-link" style="font-size: 30px;" href="#ans1">☝️</a>
      </li> */}
      
      var li = document.createElement('li')
      li.setAttribute('class', 'nav-link')
      li.innerHTML = ` <a class="nav-link"  href="#${product}">${product}</a>`
      navList.append(li)
// title as product type
    var title = document.createElement('h2')
    title.setAttribute('id', product)
    title.innerHTML =`<div class="line" ><span>${product}</span></div>`
    body.append(title)
 var flexbox = div()
 flexbox.setAttribute('class', ' flex-box')
 
 // display each products and its data
getData(product).map(data=>{
        var boxes = div()
        var image =   img()
        var p = document.createElement('div')
        p.setAttribute('style','white-space: normal')
        var con1 = div()
        var imgCon = div()
        imgCon.setAttribute('class','img-con')
        p.innerHTML = `<h3>${data.name}</h3><p style="font-size: small; color: grey;" >${data.brand}</p><p>Price : ${data.price_sign === null? '$': data.price_sign } ${data.price}</p>`
        boxes.setAttribute('class', 'box col-12 col-sm-8 col-md-6 col-lg-4')
        image.setAttribute('src',`${data.api_featured_image}`)
        imgCon.append(image)
        con1.append(imgCon, p)
        boxes.append(con1)
        flexbox.append(boxes)
})

body.append(flexbox)
} )
   


}
