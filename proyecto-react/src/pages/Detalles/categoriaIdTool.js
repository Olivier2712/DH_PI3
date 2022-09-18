export function converterCategoriaId (categoria_name, id) {
    return `${categoria_name}-${id}`;
}

export function decodeCategoriaId (categoriaId){
    const categoriaIdArray = categoriaId.split('-');
    return {
        categoriaName: categoriaIdArray[0],
        id: categoriaIdArray[1]
    }
}