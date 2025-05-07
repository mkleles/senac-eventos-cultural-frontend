import styles from './LoginPage.module.css'

function LoginPage (){
    return( 
       <div className={styles.login}>
            <div>
                <label>Email</label>
                <input type="Email" />
            </div>

            <div>
                <label> Senha</label>
                <input type="Senha" />
            </div>
            <button>Entrar</button>
        </div>
        

    )
}
export default LoginPage