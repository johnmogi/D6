import { Action } from './action';
import { ActionType } from './action-type';
import { AppState } from './app-state';

export function reducer(oldAppState: AppState, action: Action): AppState {
  const newAppState = {
    ...oldAppState,
  };

  switch (action.type) {
    case ActionType.userLogin:
      newAppState.user = action.payload;
      break;

    case ActionType.userLogout:
      newAppState.user = action.payload;
      break;

    case ActionType.getUser:
      newAppState.user = action.payload;
      break;
    case ActionType.getProducts:
      newAppState.products = action.payload;
      break;
    case ActionType.getCats:
      newAppState.cats = action.payload;
      break;
    case ActionType.getCart:
      newAppState.cart = action.payload;
      break;
    case ActionType.getCartItems:
      newAppState.cartItems = action.payload;
      break;
    case ActionType.addItemCart:
      newAppState.cartItems = action.payload;
      break;
    case ActionType.getOrders:
      newAppState.orders = action.payload;
      break;
  }

  return newAppState;
}
