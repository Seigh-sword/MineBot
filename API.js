function caesarShiftDecode(str, shift) {
    return str.split('').map(char => {
        return String.fromCharCode(char.charCodeAt(0) - shift);
    }).join('');
}

// Your encoded gibberish key (from encoder.js output)
const encodedKey = "xp2uwto2NxPw]|SzOtVxPzwIMHQ8R\\_Jj^H9Lk[fOX;F[_{HfPrl6\\Wj=owQX_mQ=FJH}tj{T9wx67NO{;Y8GqgpKOtNqVVpmlzq\\Tim\\Llk}gStd]yz|jiMury_{qrTSHq|vOK^UX]<9y]5n;;f^W|Fth9ZK8KWm:=F";

// Decode it back to the real API key
const apiKey = caesarShiftDecode(encodedKey, 5);

// Export it for your other scripts
export default apiKey;
