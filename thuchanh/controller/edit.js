let id;
// lấy input
const inputName = document.querySelector('#name');
const inputQuantity = document.querySelector('#quantity');
const inputImage = document.querySelector('#image');

function getId(){
    const params = new URLSearchParams(window.location.search)
    if(params.has('id')){
        id = params.get('id');
        // console.log(id);
        getProductById(id)
    }
}
getId()

// lấy thông tin sản phẩm theo id từ db
function getProductById(id){
    fetch(`http://localhost:3000/products/${id}`) // lấy thông tin của 1 product theo id
        .then((res)=>{
            // console.log(res);
            return res.json();
        })
        .then(data=>{
            // console.log(data);
            inputName.value = data.name;
            inputQuantity.value = data.quantity;
            inputImage.value = data.image;
        })
        .catch(err=> console.log(err))
}

function submitForm(){
    const form = document.querySelector('#formEdit');
    form.addEventListener('submit',(event)=>{
        // ngăn chặn hành vi tải trang
        event.preventDefault();
        // console.log('submit');

        // validate dữ liệu
        if(!inputName.value){
            alert("Cần nhập thông tin tên sản phẩm");
            inputName.focus();
            return;
        }
        if(!inputQuantity.value){
            alert("Cần nhập thông tin số lượng sản phẩm");
            inputQuantity.focus();
            return;
        }

        if(!inputImage.value){
            alert("Cần nhập thông tin hình ảnh sản phẩm");
            inputImage.focus();
            return;
        }

        //lấy dữ liệu
        const data = {
            name: inputName.value,
            quantity: inputQuantity.value,
            image: inputImage.value
        }

        // console.log(data);
        // cập nhật dữ liệu vào db.json
        fetch(`http://localhost:3000/products/${id}`,{
            method: 'put', // method cập nhật
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // dữ liệu cần sửa
        })
            .then(res=>{
                // chuyển về trang danh sách
                window.location = 'index.html'
                alert("Cập nhật thành công");
            })
            .catch((err)=>{
                alert("Cập nhật thất bại "+ err)
            })
        
        
    })
}

submitForm();