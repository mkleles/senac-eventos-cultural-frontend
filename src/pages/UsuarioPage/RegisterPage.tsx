import styles from "./RegisterPage.module.css";

function RegisterPage (){
    return (
        <div className={styles.register}>

            <div className={styles.borda}>
            <div>
                <h2>Registrar Usuarios </h2>
            </div>
            <div>
                <label className={styles.nome}>NOME</label>
                <input type="NOME"/>
            </div>
            <div>
                <label className={styles.email}>EMAIL</label>
                <input type="EMAIL"/>
            </div>
            <div>
                <label className={styles.tipo}>Tipo</label>
                <select className={styles.opçao}>
                    <option>Participante</option>
                    <option>Organizador</option>
                </select>
                <button className={styles.button}>REGISTRAR</button>
            </div>
            </div>


        </div>
    )

}
export default RegisterPage