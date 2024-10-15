


   

const productsCotainer = document.querySelector(".products");

const loading = document.querySelector(".hide");
const btn = document.querySelector('.submitBtn')



const API = "https://the-techie-crud.onrender.com";

const allProducts = async () => {

    loading.classList.add('show')

  try {
       const getProducts = await fetch(`${API}/products`, {
      method: "GET",
    });

    const products = await getProducts.json();

    loading.classList.remove('show')
    if (products.length && getProducts.ok) {
        for (let product of products) {
        const { category, image, isFavorite, name, price, ratings } = product;
    
        const html = `<div class='border  m-2 p-3 shadow-lg rounded-3 border border-info text-center'>
                                <img  height='150px' src=${image} alt="image">
                                <h3 class='bold'>Name : ${name}</h3>
                                <h4 class='text-secondary'>Price : ${price}</h4>
                                <h4 class='text-secondary'>Category: ${category}</h4>
                            </div>`;

        productsCotainer.innerHTML += html;
      }
    }
  } catch (error) {
    console.log(error);
  }
};


allProducts();





let inputData = {};


const inputValues = (event) => {

    const { name, value } = event.target

   

    inputData = {
        ...inputData,
        [name] : value

    }

    console.log(inputData)

} 


const uploadProfile = (event) => {


    const image = event.target.files[0];
    const formData = new FormData();

    formData.append('image', image);

    // inputData = {
    //     ...inputData,
    //     image: formData
    // }

    // API end point = '/upload-product/:productId'
}

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {


        const sendData = await fetch(`${API}/create-product`, {
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(inputData)
        })
        

        const data = await sendData.json();


        if(data){
            console.log('Product added successfully...')
            window.location.reload()
        }

    } catch (error) {
        console.log(error)
    }
    
})