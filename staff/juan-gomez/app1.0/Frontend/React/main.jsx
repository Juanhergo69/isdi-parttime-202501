const reactElement = React.createElement //Traemos react a main//
const mainContainer = document.getElementById('app') //El contenedor general será app//
const root = ReactDOM.createRoot(mainContainer) //La raíz de la app será main container//

root.render(reactElement(App)) //Ejecutamos el root sobre app//
