function actualizar()
{
  
    axios.post('/login',{
        'EMAIL':$('#email').val().trim(),
        'PASSWORD':$('#password').val().trim()
    }).then(function (response){
  console.log(response);
    })
    .catch(function (error) {
    console.log(error);
   
    });
}

// $('#btnLogin').click(function(){
// actualizar();
// });