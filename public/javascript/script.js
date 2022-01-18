// SLIDE DE IMAGENS

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}

// MENU MOBILE //

let show = true; 

const menuSection = document.querySelector(".menu-section")
const menuToggle = menuSection.querySelector(".menu-toggle")

menuToggle.addEventListener("click", () => {

    document.body.style.overflow = show ? "hidden" : "initial"

    menuSection.classList.toggle("on", show)
    show = !show;
})

// ScrollReavel //

window.sr = ScrollReveal({ reset: true});

sr.reveal('.area-2', {duration: 3000});

sr.reveal('.auto-input', {duration: 3000});

sr.reveal('.area-3', {duration: 3000});

// VALIDAÇÃO DO FORMULÁRIO //

const fields = document.querySelectorAll("[required]")

function ValidateField(field) {

  function verifyErrors() {
    let foundError = false;

    for (const error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error
      }
    }

    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Por favor, preencha este campo"
      },
      email: {
        valueMissing:"Email é obrigatório",
        typeMismatch: "Por favor, preencha um email válido"
      },
      tel: {
        valueMissing:"Email é obrigatório",
        typeMismatch: "Por favor, preencha um email válido"
      }
    }

    return messages[field.type][typeError]
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error")

    if(message) {
      spanError.classList.add("active")
      spanError.innerHTML = message
    } else {
      spanError.classList.remove("active")
      spanError.innerHTML = ""
    }
}

  return function() {

    const error = verifyErrors()

    if(error) {
      const message = customMessage(error)

      field.style.borderColor = "red"
      setCustomMessage(message)
    } else {
      field.style.borderColor = "green"
      setCustomMessage()
    }
  }
}


function customValidation(event) {

  const field = event.target
  const validation = ValidateField(field)
 
  validation()

}

for (field of fields) {
    field.addEventListener("invalid", event => {

    event.preventDefault()

    customValidation(event)
  })
    field.addEventListener("blur", customValidation)

}