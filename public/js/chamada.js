function cUpdate(){
    let serverName = window.location.origin
    htmlGet(`${serverName}/func?func=update_list`);
}