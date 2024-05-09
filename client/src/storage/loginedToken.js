
export const setToken = (name, value) => {
    console.log('setToken()');

        const obj = {
            name : name,
            value : value,
            expire : Date.now() + 1000 * 60 * 60
         }

        let objString = JSON.stringify(obj);
        localStorage.setItem(name, objString);

}

export const getToken = (name) => {
    console.log('getToken()');

        const objString = localStorage.getItem(name);

        if(!objString){
            return null;
        }

        const obj = JSON.parse(objString);

        if(Date.now() > obj.expire) {
            localStorage.removeItem(name);

            return null;
        }

        return obj.value;

}

export const removeToken = (name) => {
    console.log('removeToken()');

        const objString = localStorage.getItem(name);

        if(!objString){
            return null;
        }

        localStorage.removeItem(name);       
        
        return null;      

}
