//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN LA CREACIÓN DE UN CONTENEDOR, FORMULARIO, O PÁGINA, QUE SERÁN LLAMADOS PRÓXIMAMENTE EN LOS RENDERIZADOS. DEBE SER COLOCADO EN TERCER LUGAR DEL INDICE HTML, YA QUE CONDICIONARÁ A LOS FUTUROS RENDERIZADOS DE PÁGINAS Y FORMULARIOS, BEBIENDO PREVIAMENTE DE LAS LÓGICAS//
//******************************************************************************************************************************************************************************************//
function createContainer(style) { //La función permite crear un contenedor con estilos (style) predefinidos. Esto nos servirá para ir renderizando cada una de las páginas de nuestra web//
    var container = document.createElement('div'); //Declaramos la variable container, y le asignamos el valor de documento html creado como un div//
    container.className = style; //Continuamos asginandole la clase, que en este caso serán styles (estilos)//
    return container; //Devolvemos container//
}

function createTextContainer(tag, text, style) { //La función permite crear un elemento html que contiene texto. tag es un formalismo, se debe poner siempre, a continuación se pasa el texto y finalmente los estilos (si se quieren introducir varios estilos, han de ser seguidos dentro del mismo string)//
    var element = document.createElement(tag); //Declaramos la variable element, y le asignamos el valor de documento html creado en base al tag//
    element.textContent = text; //Continuamos asignandole el contenido, que en este caso será text (texto)//
    element.className = style; //Continuamos asignandole la clase, que en este caso serán los styles (estilos)//
    return element; //Devolvemos element//
}

function createButton(text, style, callback) { //La función permite crear un botón. text será el contenido que tendrá, style los estilos y callback funcionaría como la función que proporcionaría (en este caso una respuesta)//
    var button = document.createElement('button'); //Declaramos la variable button, y le asignamos el valor de documento html creado como botón ('button')//
    button.textContent = text; //Continuamos asignandole el contenido, que en este caso será text (texto)//
    button.className = style;  //Continuamos asignandole la clase, que en este caso serán los styles (estilos)//
    button.addEventListener('click', callback) //Creamos un adEventListener, en base al click realizado sobre el botón, para ejecutar el callback//
    return button; //Devolvemos button//
}

function createImgButton(img, style, callback) { //La función permite crear un botón asociado a una imagen. Tendrá, la propia imagen, los estilos y el callback//
    var imgButton = document.createElement('button') //Declaramos la variable imgButton, que será el botón que ejecutará el submit//
    imgButton.style.border = 'none'; //Añadimos estilos al botón que contendrá la imágen para hacerlo desaparecer del renderizado (tras errores de visualización en la página, he llegado a esta conclusión)//
    imgButton.style.background = 'transparent'; //Añadimos estilos al botón que contendrá la imágen para hacer desaparecer del rederizado (tras errores de visualización de la página, he llegado a esta conclusión)//
    var img = document.createElement('img') //Declaramos la variable img, que será la imagen que se introducirá al botón para ejecutuar el submit//
    img.src = 'Logo.jpg' ///Añadimos la raíz de esta imagen (en este caso, esta añadida a la propia carpeta de la app)//
    img.className = style //Declaramos clase de img, que en este caso serán los estilos//

    imgButton.appendChild(img) //Añadimos img al imgbutton//
    body.appendChild(imgButton) //Añadimos imgButton al body//

    imgButton.addEventListener('click', callback) //Creamos adEventListener, en base al click realizado sobre el botón, para ejecutar el callback//
    return imgButton //Devolvemos imgButton//
}


function createForm(inputsArray, submitButtonText, callback) { //La función permite crear un formulario. inputsArray serán los objetos a crear ej.-->[{label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email'}, {label: 'Password....}], submitButtonText será el botón de ejecución de los inputsArray y callback sería la función de respuesta a todo lo anterior//
    var formContainer = document.createElement('form'); //Declaramos la variable formContainer, y le asignamos el valor de documento html creado como 'div'. Será el contenedor de nuestro formulario//
    formContainer.className = 'form' //Continuamos asignandole la clase, que en este caso será un formulario (form)//
    for (var i = 0; i < inputsArray.length; i++) { //El for itera todos los elementos de inputsArray//
        var input = inputsArray[i] //Declaramos la variable input, y le asignamos el valor del indice recorrido en el for sobre inputsArray//
        var label = document.createElement('label') //Declaramos la variable label, y le asignamos el valor de documento html creado como etiqueta (label)//
        label.htmlFor = input.inputId //Continuamos asignando a label la funcion htmlFor, que permite iterar los elementos que se asignen. ej-->input = {... inputId: 'email'}; input.inputId === 'email'//
        label.textContent = input.label //Continuamos asignando a label el contenido de texto, que en este caso será la etiqueta (label) generada sobre el input//

        var inputElement = document.createElement('input') //Declaramos la variable inputElement, y le asignamos el valor de documento html creado como input//
        inputElement.type = input.inputType; //Continuamos asignando a inputElement el tipo, que será el tipo de input generado sobre el input//
        inputElement.id = input.inputId; //Continuamos asignando a inputElement la id, que sera la id del input sobre el input//

        if (input.inputType !== 'checkbox') { //El if nos indica, que si el input es distinto a una checkbox//
            inputElement.placeholder = input.inputPlaceholder || '' //Continuamos asignando a inputElement el placeholder, que será aquello que sirva de guía para que el usuario sepa que debe escribir ahí. Será la id del placeholder sobre el input//
        } else { //Si el if no se cumple, y por tanto, se trata de un checkbox//
            inputElement.className = 'checkbox' //Continuamos asignando a inputElement la case de checkbox//
        }

        inputElement.required = input.isRequired //Continuamos asignando a inputElement la categoría required, que servirá para que ese campo sea de obligatorio cumplimiento para seguir avanzando//


        formContainer.appendChild(label) //Añadimos label a formContainer//
        formContainer.appendChild(inputElement) //Añadimos inputElemento a formContainer//
        body.appendChild(formContainer) //Añadimos formContainer al body/
    }

    var submitButton = document.createElement('input'); //Declaramos variable sumbitButton, y le asignamos el valor de documento html creado como input//
    submitButton.type = 'submit'; //Continuamos asignando el tipo de submitButton, que en este caso será submit//
    submitButton.value = submitButtonText //Continuamos asignando el valor de submitButton, que en este caso será submitButtonText//

    formContainer.appendChild(submitButton) //Añadimos submitButton a formContainer//

    formContainer.addEventListener('submit', function (event) { //Indicamos que, cuando se producza un submit (en este caso, que se ejecute submitButton) , se ejecutará una función sobre el evento//
        event.preventDefault() //Para evitar comportamientos extraños, como que se reinice el renderizado, ejecutamos preventDefault sobre ese evento//

        var form = event.target //Declaramos variable form, que será igual al objetivo del evento. En este caso, el objetivo del evento es el formulario creado. ej--> elemento form html al que le hemos dado submit//
        var formData = {} //Declaramos variable formData, que se corresponderá a los datos del formulario. Se declara como un objeto vacío que se irá rellenando con la iteración del siguiente for//

        for (var i = 0; i < inputsArray.length; i++) { //El for itera todos los elementos que se han generado en el formulario. La intención es acceder a los valores que escribe el usuario//

            //ej.-->inputsArray = [{ label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email' }, ...]//
            //Normalmente para acceder al valor de un input a traves del id ej.--> event.target.idDelInput (e.g. event.target.email)//

            //ej.-->form[inputsArray[i].inputId] ---> event.target['email'] === event.target.email
            //ej.-->console.log(form[inputsArray[i].inputId].value) //<input />.value

            var fieldName = inputsArray[i].inputId //Declaramos variable fieldName, que se corresponde al nombre del campo, y le asignamos el valor del indice de inputsArray en base la id del input//
            var value = form[inputsArray[i].inputId].value //Declaramos variable value, que se corresponde al valor de ese input, y le asignamos el valor del objetivo del evento (form) sobre el indice de inputsArray, en base al valor de la id del input//

            if (inputsArray[i].inputType === 'checkbox') {
                value = form[inputsArray[i].inputId].checked
            } else {
                value = form[inputsArray[i].inputId].value
            }
            formData[fieldName] = value; //Asignamos a formData, en base al nombre del campo, el valor iterado en el for. ej-->formData = {'email': 'patata@mail.com'}//
        }

        callback(formData) //Llamamos a la respuesta (callback) de los datos del formulario.
    })

    return formContainer //Devolvemos formContainer//

}

function createHomePage() { //La función permite crear la página home//
    var homeContainer = createContainer('')  //Declaramos la variable homeContainer (contenedor de la página home), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    var loggedUserId //Declaramos variable loggedUserId, que recogerá los datos del usuario que ha hecho login, y en un princpio, la declaramos vacía, ya que dependiendo de si el almacenamiento es local o en sesión se añadairá a uno u otro (if de más abajo)//

    if (localStorage.id) { //El if nos indica que, si la id se encuentra en localStorage (almacenamiento local)//
        loggedUserId = JSON.parse(localStorage.getItem('id')) //Declaramos que la id del usuario que ha logueado se quedará almacenado en el local de la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia JSONparse permite transformar el resultado en formato json a formato javascript//
    } else { //Si el if no se cumple, y por tanto, si la id se encuentra sessionStorage (almacenamiento en la sesion)//
        loggedUserId = JSON.parse(sessionStorage.getItem('id')); //Declaramos que la id del usuario que ha logueado se quedará almacenado en la sesion de la base de datos de juguete (devtools/aplications/sessionstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia JSONparse permite transformar el resultado en formato json a formato javascript//
    }

    var usersJson = localStorage.users //Declaramos variable usersJson, que serán los usuarios que se registren, y que quedarán almacenados en la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia//
    var users = JSON.parse(usersJson) //Transformar el resultado en formato json a formato javascript// 

    var userLogged = users ? users.find(function (_user) { return _user.id === loggedUserId }) : undefined //Declaramos variable userLogged, que permitirá comprobar, con ternarios, si el usuario se encuentra en la comprobación facilitada//

    if (!userLogged) { //El if nos indica que si el usuario no se encuentra previamente registrado//
        alert('Create an account first') //Nos arroja un alert con el siguiente mensaje//
        return renderRegisterPage();
    }

    var loggedUserUsername = userLogged.userName //Declaramos la variable loggedUserUserName, que se corresponderá al usuario logeado en base a su nombre de usuario//
    var welcomeText = createTextContainer('h1', `Welcome, ${loggedUserUsername}`, 'welcomeMsg') //Declaramos la variable welcomeText, que se corresponderá al mensaje de bienvenida una vez se acceda a la página home//
    welcomeText.className = 'welcomeMsg'
    var logoutButton = createButton('Logout', 'logoutButton', function () { //Declaramos la variable logoutButton (que será el botón para salir de la página home, y deslogar el usuario), y le asignamos el valor de la función createButton. Entre paréntesis, agregamos el texto, los estilos, y la pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
        if (sessionStorage.id) { //El if indica que, si se desloguea desde la sessionStorage (almacenamiento de la sesión)//
            sessionStorage.removeItem('id') //Se elimina la id de la sessionStorage//
        }
        if (localStorage.id) { //El if indica que, si se deslogue desde la localStorage (almacenamiento local)//
            localStorage.removeItem('id') //Se elimina la id de la localStorage//
        }
        navigateToLogin(homeContainer)
    })

    homeContainer.appendChild(welcomeText) //Añadimos welcomeText a homeContainer//
    homeContainer.appendChild(logoutButton) //Añadimos logoutButton a homeContainer//
    body.appendChild(homeContainer) //Añadimos homeContainer al body//

    return homeContainer //Devolvemos homeContainer//
}
//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//