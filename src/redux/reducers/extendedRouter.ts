function extendedRouter(state = {}, action: any) {
    switch (action.type) {
        case "@@router/LOCATION_CHANGE":
            return {...state, anotherLocation: action.payload};
        default:
            return state;
    }
}

export default extendedRouter;