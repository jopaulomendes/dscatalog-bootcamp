import { useForm } from 'react-hook-form';
import './styles.css'
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

type UrlParams = {
    productId: string;
};

const Form = () => {

    const { productId } = useParams<UrlParams>();

    const isEditing = productId !== 'create';

    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<Product>();

    useEffect(() => {
        if (isEditing) {
            requestBackend({ url: `/products/${productId}` })
                .then((response) => {
                    const product = response.data as Product;

                    setValue('name', product.name);
                    setValue('price', product.price);
                    setValue('description', product.description);
                    setValue('imgUrl', product.imgUrl);
                    setValue('categories', product.categories);
                });
        }
    }, [isEditing, productId, setValue]);

    const onSubmit = (formData: Product) => {
        const data = {
            ...formData,
            imgUrl: isEditing ? formData.imgUrl :
                "https://www.thewall360.com/uploadImages/ExtImages/images1/def-638240706028967470.jpg",
            categories: isEditing ? formData.categories : [{ id: 1, name: "Eletrônicos" }]
        }

        const config: AxiosRequestConfig = {
            method: isEditing ? 'PUT' : 'POST',
            url: isEditing ? `/products/${productId}` : '/products',
            data,
            withCredentials: true
        };

        requestBackend(config)
            .then(() => {
                history.push('/admin/products');
            });
    };

    const handleCancel = () => {
        history.push('/admin/products');
    };

    return (
        <div className="product-crud-container">
            <div className="base-card product-crud-form-card">
                <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row product-crud-inputs-container">
                        <div className="col-lg-6 product-crud-inputs-left-container">
                            <div className="margin-bottom-30">
                                <input
                                    {...register("name", {
                                        required: "Nome obrigatório",
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Nome"
                                    name="name"
                                />
                                <div className="invalid-feedback d-block">{errors.name?.message}</div>
                            </div>
                            <div className="margin-bottom-30">
                                <input
                                    {...register("price", {
                                        required: "Preço obrigatório",
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Preço"
                                    name="price"
                                />
                                <div className="invalid-feedback d-block">{errors.price?.message}</div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div>
                                <textarea
                                    rows={10}
                                    {...register("description", {
                                        required: "Descrição obrigatório",
                                    })}
                                    className={`form-control base-input h-auto ${errors.description ? 'is-invalid' : ''}`}
                                    placeholder="Descrição"
                                    name="description"
                                />
                                <div className="invalid-feedback d-block">{errors.description?.message}</div>
                            </div>
                        </div>
                    </div>
                    <div className="product-crud-buttons-container">
                        <button
                            className="btn btn-outline-danger product-crud-button"
                            onClick={handleCancel}
                        >
                            CANCELAR
                        </button>
                        <button className="btn btn-primary product-crud-button text-white">
                            SALVAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form;