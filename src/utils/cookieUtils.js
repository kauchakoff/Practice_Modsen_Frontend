export function getCookie(name) {
    const cookies = document.cookie.split("; ").find(row => row.startsWith(`${name}=`));
    return cookies? decodeURIComponent(cookies.split("=")[1]) : null;
}

export function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
}

