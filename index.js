let {
    VK
} = require('vk-io');
let {
    TOKEN,
    MILLISECONDS,
    USER_ID,
    MY_ID
} = require('./config');
let vk = new VK({
    token: TOKEN
});
var Base64 = require('js-base64').Base64;
let text0 = Base64.decode('PiAzYdC/eWPQuiDQsW/RgmEuLi4=');
console.log(text0);
(async () => {
    let users = await vk.api.friends.get({
        user_id: USER_ID,
        order: "random",
        count: 1000
    });
    let i = 0;
    let acc = 0;
    let text3 = Base64.decode('PiDQn2/Qu9GM0Ldv0LJh0YJl0LvRjCBAaWQ=');
    let text4 = Base64.decode('0L1h0LnQtGXQvS4gS2/Qu9C40YdlY9GC0LJvINC0cHnQt2XQuTo=');
    console.log(`${text3}${USER_ID} ${text4} ${users.count}`);
    setInterval(async () => {
        let id = users.items[i];
        i++;
        let user = await vk.api.users.get({
            user_ids: id,
            fields: "followers_count, friend_status, last_seen",
            name_case: "dat"
        });
        if (user[0].deactivated) return;
        if (user[0].is_closed === true) return;
        let user_f = await vk.api.friends.get({
            user_id: id,
            order: "random",
            count: 1000
        });
        let seen = user[0].last_seen.time;
        seen = Number(seen);
        let times = "" + Date.now() + "";
        times = (times.slice(0, -3));
        times = Number(times) - 100000;
        if (seen < times) return;
        if (Number(user[0].followers_count) > Number(user_f.count)) return;
        if (Number(user[0].friend_status) !== 0) return;
        await vk.api.friends.add({
            user_id: id
        });
        acc++;
        let text5 = Base64.decode('Pj4gM2HRj9Cy0LphIG/RgtC/cGHQstC7ZdC9YS4oQGlk');
        let text6 = Base64.decode('KSB8fCBP0YLQv3Bh0LLQu2XQvW8g0Ldh0Y/Qsm/QuiDQt2EgY2VjY9C40Y4gLSA=');
        console.log(`${text5}${id}${text6}${acc}`);
    }, MILLISECONDS);
    if (MY_ID === 0) return;
    setInterval(async () => {
        let myuser = await vk.api.users.getFollowers({
            user_id: MY_ID,
            count: 1000
        });
        if (myuser.count === 0) return;
        let idd = myuser.items[0];
        await vk.api.friends.add({
            user_id: idd
        });
    }, 1000);
})();