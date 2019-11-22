import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Product, ProductModel } from '../../../products/models/product.model';
import { ProductsState } from './products.state';
import { selectRouterState } from './../router';


export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProductsData = createSelector(selectProductsState, (state: ProductsState) => state.data);
export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);
// export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);


export const selectSelectedProductByUrl = createSelector(
    selectProductsData,
    selectRouterState,
    (products, router): Product => {
        const productID = router.state.params.productID;
        if (productID && Array.isArray(products)) {
            return products.find(product => product.id === +productID);
        } else {
            return new ProductModel();
        }
});
