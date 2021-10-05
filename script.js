// useful variables
var brands =[]
var productTypes = []
var dataList = document.getElementById('brandNames')
var body = document.getElementById('app');
var div = ()=>document.createElement('div')
 var img = ()=> document.createElement('img')
var navList = document.getElementById('navList')
//fetch the api
async function fetchApi(){
  try{  console.log('fetching')
   var fetched = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json')
   var fetchedData = await fetched.json()
   filterBrand(fetchedData)}
   catch(err){console.warn('error occurs' + err)}
   return fetchedData
}

fetchApi();



function filterBrand(data){
    console.log(data);

    //getting brand name
     data.map(data=> brands.push(data.brand))
    brands = [...new Set(brands)]
    console.log(brands)
brands.forEach(brand=>{
    var option = document.createElement('option')
    option.setAttribute('value',`${brand}`)
    dataList.append(option)
})
    //getting product type
 data.map(data=> productTypes.push(data.product_type))
 productTypes = [...new Set(productTypes)]

   var getData = (val) => data.filter(data => data.product_type == val )


   //display products


   productTypes.forEach(product =>{

 //nav bar lists   
      
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
        var a = document.createElement('a')
        a.setAttribute('target','_blank')
        a.setAttribute('href',`${data.product_link}`)
        var boxes = div()
        var image =   img()
        var p = document.createElement('div')
        p.setAttribute('style','white-space: normal')
        var con1 = div()
        var imgCon = div()
        imgCon.setAttribute('class','img-con')
        p.innerHTML = `<h3>${data.name}</h3><p style="font-size: small; color: grey;" ><a target="_blank" class="link" href="${data.website_link}">${data.brand}</a></p><p>Price : ${data.price_sign === null? '$': data.price_sign } ${data.price}</p><p>${data.description === null? '<p></p>' :`<p>${data.description.substring(0, 50)}<span id="dots${data.id}">...</span><span id="${data.id}" class="more">${data.description.substring(50,data.description.length)}</span></p><button onclick="more(${data.id})" class="btn btn-dark " id="moreBtn${data.id}">Read more</button></p>`}`
        boxes.setAttribute('class', 'box col-12 col-sm-8 col-md-6 col-lg-4')
        image.setAttribute('src',`${data.api_featured_image}`)
        imgCon.append(image)
        a.append(imgCon)
        con1.append(a, p)
        boxes.append(con1)
        flexbox.append(boxes)
})

body.append(flexbox)
} )
   


}

//search result

function search(){
   
var searchVal = document.getElementById('searchBar').value

fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${searchVal}`).then(data=>data.json()).then(data=>{
    console.log(data)
    var searchResult = document.getElementById('searchResult')
    searchResult.style.display = 'block';
    var seResult = document.getElementById('seResult')
    seResult.innerHTML='loading...'
    var sere = document.createElement('div')
    sere.setAttribute('class',' sere')
     seResult.innerHTML =' '
    
    var sh = document.getElementById('sHead');
    sh.innerHTML = `<h3>${searchVal}</h3>`
 
    data.forEach(data=>{
        var a = document.createElement('a')
        a.setAttribute('target','_blank')
        a.setAttribute('href',`${data.product_link}`)
        var boxes = div()
        var image =   img()
        var p = document.createElement('div')
        p.setAttribute('style','white-space: normal')
        var con1 = div()
        var imgCon = div()
        imgCon.setAttribute('class','img-con')
        p.innerHTML = `<h3>${data.name}</h3><p style="font-size: small; color: grey;" ><a class="link" target="_blank" href="${data.website_link}">${data.brand}</a></p><p>Price : ${data.price_sign === null? '$': data.price_sign } ${data.price}</p><p><p>${data.description.substring(0, 50)}<span id="dots${data.id}">...</span><span id="${data.id}" class="more"> ${data.description.substring(50,data.description.length)}</span></p><button onclick="more(${data.id})" class='btn btn-dark ' id="moreBtn${data.id}">Read more</button></p>`
        boxes.setAttribute('class', 'box col-12 col-sm-8 col-md-6 col-lg-4')
        image.setAttribute('src',`${data.api_featured_image}`)
        imgCon.append(image)
        a.append(imgCon)
        con1.append(a, p)
        boxes.append(con1)
        sere.append(boxes)
    })
    seResult.innerHTML=''
    seResult.append(sere)
   
    searchVal = ''
}).catch(err=>console.log(err))

return false
}


//read more
function more(id) {
    var dots = document.getElementById(`dots${id}`);
    var moreText = document.getElementById(id);
    var btnText = document.getElementById(`moreBtn${id}`);
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }