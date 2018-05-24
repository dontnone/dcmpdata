import fetch from 'isomorphic-fetch';
import framework, {getCookie} from '../../components/framework'
require('es6-promise').polyfill();
  
//发送GET请求  
export function getFetch(url, params){  
    var str = '';  
    if(typeof params === 'object' && params){  
        str += '?';  
        Object.keys(params).forEach(function(val){  
            str += val + '=' + encodeURIComponent(params[val]) + '&';  
        })  
    }  

    return new Promise((resolve, reject)=> {
        fetch(url + str, {  
            method : 'GET',
            credentials: 'include'  
        }).then(function(res){
            if((res.url.indexOf('timeout') != -1 || !getCookie("JSESSIONID")) && res.url.indexOf('index') >= 0){
                window.location.replace('/index.html','_selft');
            }
            if(res.ok){  
                res.json().then(function(data){  
                    resolve(data);  
                })  
            }else if(res.status === 401){  
                console.log('请求失败');  
                reject();  
            }  
        }, function(e){  
            console.log('请求失败');  
            reject();  
        }) 
    })
     
}  
      
//发送POST请求  
export function postFetch(url, params, appli){
    var str = '';
    var applications = 'application/x-www-form-urlencoded; charset=UTF-8';
    if(appli){
        applications = 'application/json; charset=UTF-8'
    }
    if(typeof params === 'object' && params){
        Object.keys(params).forEach(function(val){
            str += val + '=' + encodeURIComponent(params[val]) + '&';
        })
    }
    return new Promise((resolve, reject)=> {
        fetch(url, {  
            method : 'POST',  
            headers: {
                "Content-Type": applications
            },
            credentials: 'include',
            body : str
        }).then(function(res){
            if((res.url.indexOf('timeout') != -1 || !getCookie("JSESSIONID")) && res.url.indexOf('index') >= 0){
                    window.location.replace('/index.html','_selft');
            }
            if(res.ok){  
                res.json().then(function(data){
                    resolve(data);  
                })  
            }else{  
                console.log('请求失败');  
                reject();  
            }  
        }, function(e){  
            console.log('请求失败');  
            reject();  
        }) 
    })
     
}  
