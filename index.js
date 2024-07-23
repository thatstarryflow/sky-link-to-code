function run(URL,codeTag) {
    var urlParams = new URLSearchParams(URL.split("?")[1]);
    let token_id = urlParams.has('i') ? urlParams.get('i') : urlParams.has('udid') && urlParams.get('type') == 'i' ? urlParams.get('udid') : null;
    if (token_id == null) {
        codeTag.textContent = "Bad link";
        return;
    }
    codeTag.textContent = toCode(token_id);
}

function toCode(token_id) {
    let short_id_int = BigInt(0);
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    for (let i=0; i<11; i++) {
        let c = BigInt(chars.indexOf(token_id.charAt(21-i)));
        if (i==10) c = c & BigInt(7);
        if (i==0) short_id_int |= c >> BigInt(4); else short_id_int |= c << BigInt(2+(i-1)*6);
    }
    let short_id = "";
    const characters = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
    for (let i=0; i<12; i++) {
        if (i > 0 && i % 4 == 0) short_id += "-";
        let s = BigInt(55 - (i * 5));
        short_id = short_id + characters.charAt(Number((short_id_int >> s) & BigInt(31)));
    }
    console.log(short_id); 
    return short_id;
}