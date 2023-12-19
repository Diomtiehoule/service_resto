import Cookies from 'js-cookie'

export const save_cookie = (data) => {
    Cookies.set("cookie_service_resto" , data , { expires : 1 , path:'/'});
    console.log(data)
} 

export const get_cookie = (cookie_name) => Cookies.get(cookie_name) ;


export const destroy = (cookie_name) =>{
    Cookies.remove(cookie_name)
    window.location.reload()
    window.location.href = '/'
}

// export default { save_cookie , get_cookie , destroy} 