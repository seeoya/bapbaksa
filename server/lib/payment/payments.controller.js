// read-only
const service = require("./payments.service");

async function confirmPayment(req, res) {
    let dataParam = JSON.parse(req.body.body);
    const confirmResponse = await service.confirmPayment(dataParam);

    return res.json({ data: confirmResponse });
}

module.exports = {
    confirmPayment,
};
