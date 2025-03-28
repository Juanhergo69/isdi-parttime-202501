const Button = ({ buttonContent, buttonCallback, className }) => { //Declaramos Button, que será la función para crear botones. Incluiremos un contenido, un callback y un nombre de clase//
    return ( //Devolveremos el nombre de clase, el callback en base a hacer click sobre el botón, y el contenido//
        <button className={className} onClick={buttonCallback}>
            {buttonContent}
        </button>
    )
}

const ImgButton = ({ imgSrc, className, onClick }) => { //Declaramos ImgButton, que será la función para crear un botón sobre una imagen. Incluiremos un enlace de la imagen, un nombre de clase, y una función onClick//
    return ( //Devolveremos, unos estilos para neutralizar el botón y que sólo se vea la imagen, su callback en base a hacer click sobre la imagen, su nombre de clase, y el enlace de la imagen//
        <button
            style={{ border: 'none', background: 'transparent' }}
            onClick={onClick}
            className={className}
        >
            <img src={imgSrc} alt="Button" style={{ width: '100%', height: 'auto' }} />
        </button>
    )
}
