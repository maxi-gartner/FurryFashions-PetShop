const boton = document.getElementById('btn')
boton.addEventListener('click', (e)=>{
  e.preventDefault() 
  const nombre = document.getElementById('nombre').value
  const correo = document.getElementById('email').value
  if(nombre === ''){
    Swal.fire(
      'Completa todos los campos!'
  )}else if(correo === ''){
    Swal.fire(
      'Completa todos los campos!'
  )}else{
    Swal.fire(
      'Mensaje enviado!'
    )
  }
})