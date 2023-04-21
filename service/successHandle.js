const successHandle = (res, message, data) => {
  res.send({
    message,
    data
  })
}

export default successHandle
