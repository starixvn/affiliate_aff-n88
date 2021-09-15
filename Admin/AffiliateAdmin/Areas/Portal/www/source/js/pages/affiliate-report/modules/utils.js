const convertToMutilSelectList = (currencyList, id, name) => {
    return currencyList.map(item => {
        return {
            key: item[id],
            name: item[name],
            checked: true
        };
    });
}

export { convertToMutilSelectList }