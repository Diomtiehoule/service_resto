const generateString = (chaine , taille) => {
    let randomString = ''
    for(let i=0 ; i< taille; i++){
        randomString += chaine[Math.floor(Math.random() * chaine.length)];
    }
    return randomString[0] != '0' ? randomString.toUpperCase() : generateString(chaine , taille)
}

export default generateString