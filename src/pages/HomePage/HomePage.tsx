import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import NavBarComponent from "../../components/NavBar/NavBarComponent";
import Styles from "./HomePage.module.css";

function HomePage() {
    
    return(
        <div>
        <NavBarComponent />
            <div className={Styles.container}>
                <h1 className={Styles.title}>Senac Eventos Cultural</h1>
                <p className={Styles.subtitle}>Seja bem-vindo!</p>
                <button>Clique Aqui/</button>
            </div>
        </div>
    )
}

export default HomePage

