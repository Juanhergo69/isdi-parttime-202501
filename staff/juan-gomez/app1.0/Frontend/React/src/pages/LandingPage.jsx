const LandingPage = ({ navigation }) => { //Declaramos la página Landign y le aplicamos la función de navegación//
    return ( //Devolveremos los siguientes renderizados//
        <div className="landingContainer">
            <img src="Logo.jpg" className="landingImg" alt="Logo" />
            <h3 className="landingMsg">Welcome to your social developer network</h3>
            <button
                className="buttonJoin"
                onClick={navigation.navigateToRegister}
            >
                Join In!
            </button>
        </div>
    );
};

