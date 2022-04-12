import home from './home'
import loading from './loading'
const models = [home,loading];
export type RootState = {
    home: typeof home.state,
    loading:typeof loading.state
}

export default models;