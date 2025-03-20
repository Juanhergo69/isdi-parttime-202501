const useState = React.useState //Traemos el hook useState//
const useEffect = React.useEffect //Traemos el hook useEffect//

const App = () => { //Declaramos app, que será el centro general de la aplicación//
    const [showForm, setShowForm] = useState(true) //Declaramos showForm, y le asignamos un useState. Renderizará (mostrará) el formulario//
    const [words, setWords] = useState([]) //Declaramos words, que serán las palabras que podamos ingresar en el formulario//
    const [timeStamp, setTimeStamp] = useState(Date.now()) //Declaramos timeStamp (sello de tiempo), que servirá para ingresar una id a cada palabra ingresada//

    useEffect(() => { //Declaramos useEffect//
        const retrievedWords = data.words.getAll() //Declaramos retrievedWord, que reflejará la devolución de las palabras ingresadas. Devolvemos todas (getAll), sobre los datos de las palabras//
        setWords(retrievedWords) //Seteamos las palabras sobre las palabras devueltas//
    }, [timeStamp]) //Aplicamos timeStamp (sello de tiempo)//

    const handleNavClick = () => { //Declaramos handleNavClick, que al activarse//
        setShowForm(!showForm) //Cambia el estado de showForm a lo contrario en lo que se encontrase//
        setTimeStamp(Date.now()) //Seteamos el sello de tiempo//
    }

    const handleSendNewWord = (newWordFormData) => { //Declaramos handleSendNewWord, para poder enviar una nueva palabra//
        const newWord = newWordFormData.word //Declaramos newWord, que se corresponderá al formato de la palabra//
        data.words.addNew(newWord) //Sobre los datos de las palabras, añadimos la nueva palabra que se ha introducido//
        setShowForm(false) //Seteamos el formulario en false para ocularlo//
        setTimeStamp(Date.now()) //Seteamos el sello de tiempo//
    }

    const handleDeleteWord = (wordIndex) => { //Declaramos handleDeleteWord, que servirá para borrar palabras inputeadas// 
        data.words.deleteByIndex(wordIndex) //Ejecutamos la eliminación de la palabra sobre el índice de palabras inputeadas//
        setTimeStamp(Date.now()) //Seteamos el sello de tiempo//
    }

    return ( //Una vez realizadas las lógicas, devolvemos los siguientes renderizados html//
        <div className="main-container">
            <Btn
                className={'navigation-button'}
                btnCallback={handleNavClick}
                btnContent={showForm ? 'Ir a lista de palabras' : 'Añadir más palabras'}
            />
            {showForm ? (
                <Form
                    inputs={[
                        { type: 'text', placeholder: 'Nueva palabra', id: 'word', className: 'input-text' }
                    ]}
                    onSubmitCallback={handleSendNewWord}
                    submitText="Añadir palabra"
                    className="form"
                />
            ) : (
                <List
                    items={words}
                    onItemClick={handleDeleteWord}
                />
            )}
        </div>
    )
}
