export default {
  namespace: "cart",
  state: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addCart(cart, action) {
      const good = action.payload;
      const idx = cart.findIndex(v => v.id == good.id);
      if (idx > -1) {
        // 更新数量
        const cartCopy = [...cart];
        const itemCopy = { ...cartCopy[idx] };
        itemCopy.count += 1;
        cartCopy.splice(idx, 1, itemCopy);
        return cartCopy;
      } else {
        // 新增
        return [...cart, { ...good, count: 1 }];
      }
    }
  }
};
