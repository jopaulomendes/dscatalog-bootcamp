import './styles.css'
import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import CategoryBadge from '../CategoryBadge';
import { Link } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type Props = {
    product: Product;
    onDelete: Function;
}

const ProductCrudCard = ({ product, onDelete }: Props) => {

    const handleDelete = (productId: number) => {
        if (!window.confirm("Tem certeza que deseja excluir esse produto?")) {
            return;
        }
        const config: AxiosRequestConfig = {
            method: 'DELETE',
            url: `/products/${productId}`,
            withCredentials: true
        };

        requestBackend(config).then(() => {
            onDelete();
        })
    }

    return (
        <div className='base-card product-crud-card'>
            <div className='product-crud-card-top-container'>
                <img src={product.imgUrl} alt={product.name} />
            </div>
            <div>
                <div className='product-crud-card-bottom-container'>
                    <h6>{product.name}</h6>
                    <ProductPrice price={product.price} />
                </div>
                <div className='product-crud-categories-container'>
                    {product.categories.map(category => (
                        <CategoryBadge
                            name={category.name}
                            key={category.id}
                        />
                    ))}
                </div>
            </div>
            <div className='product-crud-card-buttons-container'>
                <button
                    className='btn btn-outline-danger product-crud-card-button product-crud-card-button-first'
                    onClick={() => handleDelete(product.id)}
                >
                    Excluir
                </button>
                <Link to={`/admin/products/${product.id}`}>
                    <button className='btn btn-outline-secondary product-crud-card-button'>
                        Editar
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ProductCrudCard;