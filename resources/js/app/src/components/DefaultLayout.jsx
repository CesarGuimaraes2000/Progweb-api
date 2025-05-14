import React, { Children } from 'react'
import { Link } from 'react-router-dom'

export default function DefaultLayout({children}){
    
    return(
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/user/index" >Usuário</Link>
                <Link to="/categoria/index" >Categorias</Link>
                {/*<Link to="/editora/index"/>Editora</Link>*/}
                {/*<Link to="/autor/index"/>Autor</Link>*/}
                {/*<Link to="/livro/index"/>Livro</Link>*/}
            </aside>
            <div className='content'>
                <header>
                    <div className='header'>
                        Sistema de controlololo
                    </div>
                    <div>
                        Cesar &nbsp; &nbsp;
                    </div>
                    <button className='btn-logout'>
                        Logout
                    </button>
                </header>
                <main>
                    { children }
                </main>
            </div>
        </div>
    )
}