import request from '@/utils/request'

// 订单结算确认
// mode: cart   =>obj { cartIds }
// mode: buyNow => obj { goodsId goodsNum goodsSkuId}
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10, // 10 快递配送 20 上门自提
      couponId: 0, // 优惠卷id传0，不使用优惠卷
      isUsePoints: 0, // 积分传0，不使用积分
      ...obj // 将传过来的参数对象 动态展开
    }
  })
}

// 订单提交
// mode: cart   =>obj { cartIds remark }
// mode: buyNow => obj { goodsId goodsNum goodsSkuId remark}
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj

  })
}

// 获取订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
