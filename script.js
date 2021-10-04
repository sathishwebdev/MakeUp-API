// useful variables

var body = document.getElementById('app');

//fetch the api
async function fetchApi(){
  try{  console.log('fetching')
   var fetched = await fetch('products.json')
   var fetchedData = await fetched.json()
   App(fetchedData)}
   catch{
    console.warn('error occurs')
}
   return fetchedData
}

fetchApi();



function App(data){
    console.log(data);
    data.map(data=>{
        

    })
}

// var box = document.createElement('div')
//         box.setAttribute('class', 'box')
//         var img = document.createElement('img')
//         img.setAttribute('src',`${data.api_featured_image}`)
//         box.append(img)
//         body.append(box)