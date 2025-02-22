const jwt = require('jsonwebtoken');
const jwtpassword = "secret";
const zod = require('zod');

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signjwt(username, password) {
    const usernameres = emailSchema.safeparse(username);
    const passwordres = passwordSchema.safeparse(password);
    if(!usernameres.success || !passwordres.success) {
        return null;
    } 
    const signature = jwt.sign({
        username
    }, jwtpassword);
    return signature;
}
const ans = signjwt("rahul@gmail.com", "sdfsfds")
console.log(ans);