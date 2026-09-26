// weight: khối lượng đơn hàng (kg)
// distance: khoảng cách giao hàng (km)
// value: giá trị đơn hàng (đồng)

const deliveryFeeCharged = (weight, distance, value) => {
    if (weight <= 0 ||
        weight > 30 ||
        distance <= 0 ||
        distance > 100 ||
        value < 50000 ||
        value > 20000000) {
        return "Invalid";
    }
    if (value >= 500000 && weight <= 5 && distance <= 10) {
        return "Free shipping";
    }
    if (weight <= 10 && distance <= 30) {
        return "Shipping fee type 1";
    }
    if (weight <= 20 && distance <= 60) {
        return "Shipping fee type 2";
    }
    if (weight <= 30 && distance <= 100) {
        return "Shipping fee type 3";
    }
    return "Delivery is not supported";
}

module.exports = deliveryFeeCharged;