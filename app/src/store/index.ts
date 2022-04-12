import { createStore,applyMiddleware } from "redux"
import createMiddleware from "redux-saga"
import reducers from "./reducers"
import effects from "./effects"

const sagaMiddleware = createMiddleware();
const store = createStore(reducers,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(effects)