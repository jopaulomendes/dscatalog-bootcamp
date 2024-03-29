import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import './styles.css';
import ButonIcon from 'components/ButonIcon';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className="base-card home-card">
                <div className="home-content-container">
                    <div>
                        <h1>Conheça o melhor catálago de conteúdo</h1>
                        <p>Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.</p>
                    </div>
                    <div>
                        <Link to="/products">
                            <ButonIcon text='Inicia agora sua busca'/>
                        </Link>
                    </div>
                </div>
                <div className="home-image-container">
                    <MainImage />
                </div>
            </div>
        </div>
    );
}

export default Home;