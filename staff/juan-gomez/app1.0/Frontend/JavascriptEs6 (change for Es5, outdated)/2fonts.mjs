//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUENTES QUE HE IMPORTADO PARA UTILIZARLAS EN LA PÁGINA WEB. DEBE SER COLOCADO EN SEGUNDO LUGAR DEL INDICE HTML, YA QUE CONDICIONARÁ A LOS FUTUROS RENDERIZADOS DE PÁGINAS Y FORMULARIOS//
//******************************************************************************************************************************************************************************************//
export const loadFonts = () => { //Exportamos y creamos función loadFonts, que nos permitirá cargar al body las siguientes fuentes de texto (agregando más links se pueden añadir infinitas fuentes dentro de la misma función//
    const link = document.createElement('link') //Creamos el link de la fuente de texto//
    link.href = 'https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap' //Indicamos el src de la fuente//
    link.rel = 'stylesheet' //Se declara como un estilo//
    document.head.appendChild(link) //Se añade al head del documento//

    const link2 = document.createElement('link')
    link2.href = 'https://fonts.googleapis.com/css2?family=Zen+Dots&family=Zen+Loop:ital@0;1&display=swap';
    link2.rel = 'stylesheet';
    document.head.appendChild(link2)
}
//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//

