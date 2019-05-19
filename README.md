# Indonesian Numeral Spellers

Indonesian Numeral Spellers is an api which can convert number to Indonesian Language or vice versa. This API made by GO and use mux package to create API handle function. This API receive positive number between 0 and 2.000.000. API's respond should be a json format if the parameter is a valid number. 

## How to Install
1. Install gorilla/mux
2. Build package spell and read
3. Install main.go (API run in http://localhost:8030/)
4. Run main.go
6. Run index.html in your browser

## Request Example
### Request Example 1 : GET /spell
Request :
```
GET '/spell?number=68573'
```
Response :
```JSON
STATUS CODE 200
{
    "status" : "OK",
    "text" : "enam puluh delapan ribu lima ratus tujuh puluh tiga"
}
```

### Request Example 2 : POST /read
Request:
```JSON
POST '/read'
{
    "text" : "sembilan belas juta sembilan belas ribu lima ratus"
}
```
Response :
```JSON
STATUS CODE 200
{
    "status" : "OK",
    "number" : 19019500
}
```