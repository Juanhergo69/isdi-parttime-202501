const useState = React.useState //Traemos hook de useState//
const useEffect = React.useEffect //Traemos hook de useEffect//

const App = () => { //Declaramos App, que será nuestra aplicación (aquí irá todo el código relacionado con ella)
    const [showWordForm, setShowWordForm] = useState(true) //Declaramos showWordForm, que será el formulario de palabras. Seteamos useState como true, para mostrarlo//
    const [showNumberForm, setShowNumberForm] = useState(true) //Declaramos showNumberForm, que será el formulario de números. Seteamos useState como true, para mostrarlo//
    const [words, setWords] = useState([]) //Declramos words, que serán las palabras que se ingresarán en showWordForm. Seteamos useState como array vacío, que se rellenará conforme a los inputs del usuario//
    const [numbers, setNumbers] = useState([]) //Declaramos numbers, que serán los números que se ingresarán en showNumbersForm Seteamos useState como array vacío, que se rellenará conforme a los inputs del usuario//
    const [timeStamp, setTimeStamp] = useState(Date.now()) //Declaramos timeStamp, que servirá como indicador de los montajes/desmontajes de los renderizados. Seteamos useState como la fecha actual, para que cada timeStamp se diferente//

    useEffect(() => { //Declaramos el primer useEffect, que será aplicado a las palabras//
        const fetchWords = async () => { //Declaramos fecthWords, que servirá como buscador de las palabras ingresadas en showWordForm. Lo declaramos como asíncrono, para que el useEffect de las palabras respete al useEffect de los números//
            const retrievedWords = await data.words.getAll() //Declaramos retrieveWord, que serán las palabras recuperadas de localStorage. Se recuperarán las palabras almacenadas, pero deberá esperar que se realice primero la función asíncrona (promises)//
            setWords(retrievedWords) //Seteamos las palabras en base a las palabras recuperadas//
        }
        fetchWords() //Ejecutamos la función asíncrona para buscar las palabras//
    }, [timeStamp]) //Aplicamos timeStamp//

    useEffect(() => { //Declaramos el segundo useEffect, que será aplicado a los números//
        const fetchNumbers = async () => { //Declaramos fecthNumbers, que servirá como buscador de los números ingresados en showNumberForm. Lo declaramos como asíncrono, para que el useEffect de los números respete al useEffect de las palabras//
            const retrievedNumbers = await data.numbers.getAll() //Declaramos retrieveNumbers, que serán los números recuperados de localStorage. Se recuperarán los números almacenados, pero deberá esperar que se realice primero la función asíncrona (promises)//
            setNumbers(retrievedNumbers) //Seteamos los números en base a los números recuperados//
        }
        fetchNumbers() //Ejecutamos la función asíncrona para buscar los números//
    }, [timeStamp]) //Apliamos timeStamp//

    const handleNavClickWords = () => { //Declaramos handleNavClickWords, que será la función para mostrar o esconder showWordForm//
        setShowWordForm(!showWordForm) //Seteamos showWordForm como el estado contrario al que se encuentre al momento de hacer click//
        setTimeStamp(Date.now()) //Seteamos timeStamp//
    }

    const handleNavClickNumbers = () => { //Declaramos handleNavClickNumbers, que será la función para mostrar o esconder showNumberForm//
        setShowNumberForm(!showNumberForm) //Seteamos showNumberForm como el estado contrario al que se encuentre al momento de hacer click//
        setTimeStamp(Date.now()) //Seteamos timeStamp//
    }

    const handleSendNewWord = async (newWordFormData) => { //Declaramos handleSendNewWord, que será la función para enviar una nueva palabra. Lo declaramos como asíncrono, para que esta función respete a la función de envío de un nuevo número//
        try { //Indicamos como try (intento)//
            const newWord = newWordFormData.word //Declaramos newWord, que será la nueva palabra ingresada en el input//
            await data.words.addNew(newWord) //Añadimos esa nueva palabra a localStorage, pero esperando a que primero se ejecute la función asíncrona//
            setShowWordForm(false) //Seteamos showWordForm como false para esconderlo//
            setTimeStamp(Date.now()) //Seteamos timeStamp//
        } catch (error) { //Indicamos como captura de un error//
            console.error('Error al añadir nueva palabra:', error) //Ejecutamos un console error indicando que no se ha podido añadir la palabra//
        }
    }

    const handleDeleteWord = (wordIndex) => { //Declaramos handleDeleteWord, que será la función para eliminar las palabras almacenadas en localStorage//
        data.words.deleteByIndex(wordIndex) //Indicamos que se eliminarán desde el índice de las palabras//
        setTimeStamp(Date.now()) //Seteamos setTimeStamp//
    }

    const handleSendNewNumber = async (newNumberFormData) => { //Declaramos handleSendNewNumber, que será la función para enviar un nuevo número. Lo declaramos como asíncrono, para que esta función respete a la función de envío de una nueva palabra//
        try { //Indicamos como try (intento)//
            const newNumber = newNumberFormData.number //Declaramos newNumber, que será el nuevo número ingresado en el input//
            await data.numbers.addNew(newNumber) //Añadimos ese nuevo número a localStorage, pero esperando a que primero se ejecute la función asíncrona//
            setShowNumberForm(false) //Seteamos showNumberform como false para esconderlo//
            setTimeStamp(Date.now()) //Seteamos timeStamp//
        } catch (error) { //Indicamos como captura de un error//
            console.error('Error al añadir nuevo número:', error) //Ejecutamos un console error indicando que no se ha podido añadir el número//
        }
    }

    const handleDeleteNumber = (numberIndex) => { //Declaramos handleDeleteNumber, que será la función para eliminar los números almacenados en localStorage//
        data.numbers.deleteByIndex(numberIndex) //Indicamos que se eliminarán desde el índice de los números//
        setTimeStamp(Date.now()) //Seteamos setTimeStamp//
    }

    return ( //Devolveremos, en base a las anteriores funciones, los siguientes renderizados en pantalla//
        <div className='main-container'> {/*Declaramos main-container, que será el contenedor principal de los renderizados*/}
            <Btn //Dentro de main-container tendremos un botón que tendrá las siguientes características//
                className={'navigation-button'} //Un nombre de clase//
                btnCallback={handleNavClickWords} //La función que realizaría//
                btnContent={showWordForm ? 'Ir a lista de palabras' : 'Añadir más palabras'} //Y el contenido que tendrá este botón//
            />
            {showWordForm ? ( //Si se muestra showWordForm, se generará el formulario//
                <Form //Y dentro del formulario, se renderizarán los siguientes parámetros//
                    inputs={[ //Un input con un tipo, placeholder (si se quiere), una id y un nombre de clase//
                        { type: 'text', placeholder: 'Nueva palabra', id: 'word', className: 'input-text' }
                    ]}
                    onSubmitCallback={handleSendNewWord} //Un botón que ejecutará una función//
                    submitText="Añadir palabra" //El texto que contendrá este botón//
                    className="form" //Un nombre de clase general para el formulario//
                />
            ) : ( //Si no se muestra showWordForm, se generará una lista//
                <List //Y dentro de la lista, se renderizarán los siguientes parámetros//
                    items={words} //Unos items, que serán las palabras//
                    onItemClick={handleDeleteWord} //Y un botón para cada item que ejecutará una función//
                />
            )}
            <Btn //Dentro de main-container tendremos otro botón que tendrá las siguientes caractéristicas//
                className={'navigation-button'} //Un nombre de clase//
                btnCallback={handleNavClickNumbers} //La función que realizaría//
                btnContent={showNumberForm ? 'Ir a lista de números' : 'Añadir más números'} //Y el contenido que tendrá ese botón//
            />
            {showNumberForm ? ( //Si se muestra showNumberForm, se generará el formulario//
                <Form //Y dentro del formulario, se renderizarán los siguientes parámetros//
                    inputs={[ //Un input con un tipo, placeholder (si se quiere), una id y un nombre de clase//
                        { type: 'number', placeholder: 'Nuevo número', id: 'number', className: 'input-number' }
                    ]}
                    onSubmitCallback={handleSendNewNumber} //Un botón que ejecutará una función//
                    submitText='Añadir número' //El texto que contendrá este botón//
                    className='form' //Un nombre de clase general para el formulario//
                />
            ) : ( //Si no se muestra showNumberForm, se generará una lista//
                <List //Y dentro de la lista, se renderizarán los siguientes parámetros//
                    items={numbers} //Unos items, que serán los números//
                    onItemClick={handleDeleteNumber} //Y un botón para cada item que ejecutará una función//
                />
            )}
        </div>
    )
}
