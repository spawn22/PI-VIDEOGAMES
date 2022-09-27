import {Link} from 'react-router-dom';
import {FaGithub, FaLinkedin} from "react-icons/fa"
import "./Landing.css";


const Landing = () => {
    return (
        <main className="main">
            <link href="http://fonts.cdnfonts.com/css/arcade-classic" rel="stylesheet"></link>
            <Link to="/videogames" className="main_btn">
                Vamo a juga
            </Link>
            <h1 className="nombre">Created by Lucas Ruiz</h1>
            <div className='botones_links'>
                <a href='https://www.linkedin.com/in/lucas-ruiz-68249224b/' rel="noreferrer" target="_blank">
                <FaLinkedin/>
                </a>
            </div>
            <div className='boton_git'>
                <a href='https://github.com/spawn22' rel="noreferrer" target="_blank">
                <FaGithub/>
                </a>
            </div>
        </main>
    );
}


export default Landing;
