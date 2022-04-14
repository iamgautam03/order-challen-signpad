# Order Challen SignPad
- Order Challen SignPad is a website based utility that provides signpad fetures involves for customer and sender when the order is received.
- Sender Registers and Logged in to generate link for a particular order which will be send to customer
- Customer will signs on sign pad given on generated link once order has been received


# Express Routes:

## Pages:
### Public:
1. /registration
    - register.html
    - get
    - send page

2. /login
    - login.html
    - get
    - send page

3. /sign/{token}
    - signpad.html
    - get
    - send page

### Private:
1. /dashboard or / (redirect to /dashboard)
    - dashboard.html
    - get
    - send page

2. /order/add
    - orderform.html
    - get
    - send page

3. /order/{id}
    - vieworder.html
    - get
    - send page

## Apis:

### Public:
1. api/register:
    - post
    - formdata

2. api/login:
    - post
    - formdata
    - returns token (jwt)

3. api/sign/{token}
    - post
    - json
    - returns response {msg, status}
### Private:
1. api/orders:
    - get
    - return json array

2. api/order/add:
    - post
    - formdata
    - returns response {msg, status}

3. api/order/{id}
    - get
    - returns json of order