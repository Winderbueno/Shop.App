//#region NgRx
import { Action, createReducer, on } from '@ngrx/store';
//#endregion

//#region State, Model, Action
import { ShoppingListState, initialState, adapter } from './shopping-list.state';
import * as fromForm from '@form/store';
import * as fromAPI from '../service/shopping-list.api.actions';
import * as fromComponent from '../component';
import * as AccountAPIActions from '@account/service/account.api.actions'; // TODO
import { CatUsedProduct, SubCatUsedProduct, UsedProduct } from '../model/used-product.model';
//#endregion

export const featureKey = 'shoppingList';

const shoppingListReducer = createReducer(
  initialState,

  on(fromAPI.loadActiveSuccessAction,
    (state, { shoppingList }) =>
      (adapter.addOne(shoppingList, { ...state, isActiveLoaded: true }))
  ),

  on(
    AccountAPIActions.logoutSuccessAction,
    AccountAPIActions.logoutFailureAction,
    AccountAPIActions.refreshTokenFailureAction, // TODO - Any type of Logout should restore state to initial state
    (state) =>
      (adapter.removeAll({ ...state, isActiveLoaded: false, }))
  ),

  on(fromComponent.productChipClickedAction,
    (state, action) => {
      // Toggle product bought status
      // TODO - Nested update should be avoided in reducer
      const changes = {
        ...state.entities[action.shoppingListId],
        catProducts: state.entities[action.shoppingListId]?.catProducts?.map((item) => {
          if (item.category !== action.category) { return item; }
          return {
            ...item,
            subCatProducts: item.subCatProducts.map((item) => {
              if (item.subCategory !== action.subCategory) { return item; }
              return {
                ...item,
                products: item.products.map((item) => {
                  if (item.usedProductId !== action.productUpdate.id) { return item; }
                  return { ...item, bought: !item.bought };
                })
              };
            })
          };
        })
      };

      return adapter.updateOne({ id: action.shoppingListId, changes: changes }, state);
    }
  ),

  on(fromForm.buttonClickedAction,
    (state, action) => {
      if (action.buttonId !== 'Reset Status') { return state; }

      // Reset all product bought status
      // TODO - Nested update should be avoided in reducer
      const shoppingListId = state.ids[0];
      const changes = {
        ...state.entities[shoppingListId],
        catProducts: state.entities[shoppingListId]?.catProducts?.map((item) => {
          return {
            ...item,
            subCatProducts: item.subCatProducts.map((item) => {
              return {
                ...item,
                products: item.products.map((item) => {
                  return { ...item, bought: true };
                })
              };
            })
          };
        })
      };

      return adapter.updateOne({ id: shoppingListId as string, changes: changes }, state);
    }
  ),

  on(fromComponent.productChipDeleteButtonClickedAction,
    (state, action) => {

      // Delete Product
      // TODO - Nested update should be avoided in reducer
      const shoppingListId = state.ids[0];
      let catToDelete: string | undefined;
      let filteredCatProd = state.entities[shoppingListId]?.catProducts?.map((item) => {

        let subCatToDelete: string | undefined;
        let filteredSubCatProd = item.subCatProducts.map((item) => {
          const filteredProd = item.products.filter(item => item.usedProductId !== Number(action.productId));
          if (filteredProd.length === 0) subCatToDelete = item.subCategory;
          return { ...item, products: filteredProd };
        });

        if (subCatToDelete) {
          filteredSubCatProd = item.subCatProducts.filter(item => item.subCategory !== subCatToDelete);
          if (filteredSubCatProd.length === 0) { catToDelete = item.category; }
        }
        return { ...item, subCatProducts: filteredSubCatProd }
      });

      if (catToDelete) {
        filteredCatProd = state.entities[shoppingListId]?.catProducts?.
          filter(item => item.category !== catToDelete);
      }

      const changes = { ...state.entities[shoppingListId], catProducts: filteredCatProd };
      return adapter.updateOne({ id: shoppingListId as string, changes: changes }, state);
    }
  ),

  on(fromAPI.createProductSuccessAction,
    (state, action) => {

      // TODO/WARN - we had a UsedProduct To state that does not respect UsedProduct model of BACK-END 
      // category & sub category are not in UsedProduct model in this version
      let shoppingListId = state.ids[0];
      let createdProduct: UsedProduct = action.product;
      let newCatProducts: CatUsedProduct[] = state.entities[shoppingListId]?.catProducts?.slice()!;
      let newSubCatProduct: SubCatUsedProduct;

      // Check if Category/SubCategory of created product was already in shoppingList
      let isCatInState = false;
      let isSubCatInState = false;
      newCatProducts?.forEach((item) => {
        if (item.category === createdProduct.category) {
          isCatInState = true;
          item.subCatProducts.forEach((item) => {
            if (item.subCategory === createdProduct.subCategory) isSubCatInState = true;
          })
        }
      });

      if (isSubCatInState) {
        newCatProducts = newCatProducts?.map((item) => {
          if (item.category !== createdProduct.category) { return item; }
          return {
            ...item,
            subCatProducts: item.subCatProducts.map((item) => {
              if (item.subCategory !== createdProduct.subCategory) { return item; }
              return {
                ...item,
                products: [...item.products.slice(0, item.products.length),
                  createdProduct]
              };
            })
          };
        });
      } else {

        newSubCatProduct = {
          subCategory: createdProduct.subCategory!,
          products: [createdProduct]
        };

        if (!isCatInState) {
          newCatProducts?.push({
            category: createdProduct.category!,
            subCatProducts: [newSubCatProduct]
          });
        } else {
          newCatProducts = newCatProducts?.map((item) => {
            if (item.category !== createdProduct.category) { return item; }
            return {
              ...item,
              subCatProducts: [...item.subCatProducts.slice(0, item.subCatProducts.length),
                newSubCatProduct]
            };
          });
        }
      }

      const changes = { ...state.entities[shoppingListId], catProducts: newCatProducts };
      return adapter.updateOne({ id: shoppingListId as string, changes: changes }, state);
    }
  ),
);

export function reducer(state: ShoppingListState | undefined, action: Action) {
  return shoppingListReducer(state, action);
}
