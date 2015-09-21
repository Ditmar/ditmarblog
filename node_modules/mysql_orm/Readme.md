# Mysql Orm
## How to use
The following example shows how we can do the connection width mysql database, and do a basic query, to table called products.
The object rows have a attribute called result, all query of the database are stored in that variable.
```js
var db=require("mysql_orm");
var settings={
	host:"localhost",
	user:"root",
	password:"",
	database:"store",
	port:""
}
var query=db.mysql(settings);
query.get("products").execute(function(rows){
	console.log(rows.result);
});
```

### Get Request to mysql
In this example shows how to load a especific data, using the statements Where or where_or


```js
db.get("users").where({"nickname":username,"password":password}).execute(function(row){
	console.log(row.result)
});
```
### Between, orderby
```js
query.get("buy").between("date_register","2015/05/14","2015/06/20").orderby("-id").many_join("products").execute(function(rows){
  rows.products.all(function(){
      console.log(rows.result);
  });
});
```

### Get queries one to Many, Many to Many, etc.
Let's see examples about how load many information keep  the relationship between tables, it's important the database "mysql" have to work with engine=innodb for that examples run.
The image below shows how the tables of the database are connected.

![Monit](https://dl.dropboxusercontent.com/u/47683967/base.png)

In this example shows how load many data for example the relationship between tables "users" and "buy".
Especific in this query we are load the first row, that set width the index 0,1,2.., of the attribute called result 
```js
query.get("users").execute(function(rows){
  rows.result[0].buy.all(function(r){
  	console.log(r)
    console.log(rows.result);
  });    
});
```
the param r has  the specific data for the first row in the index=0 rows.result[0], and the rows variable has  all information of the query, "when de callback function is called".

If you want load all collection of one time you may use this.
```js
query.get("users").execute(function(rows){
  rows.buy.all(function(r){
     //the response 
     console.log(r);
     console.log(rows);

  });   
});
```
if you want see all information only have to put console.log(rows); rows load inside  it  all information of the query

The last example show how we can do a query Many to Many.
For example I want to see all information of the buys, but i need that information be in detail, the relationship let do that in the database.
¿How? using the function many_join
```js
query.get("buy").many_join("products").execute(function(rows){
  rows.products.all(function(){
      console.log(rows.result);
  });
});
```
In this code we have all information of the relation between tables. if you want only a especifict row, you can combine all statemets, for example where, limit, between and more.
```js
query.get("buy").where({id:5},">").orderby("-id").many_join("products").execute(function(rows){
  rows.products.all(function(){
      console.log(rows.result);
  });
});
```
Thats all.
