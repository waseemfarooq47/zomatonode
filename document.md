Page1(Home Page)
> List Of City 
(this will return all the city)
http://localhost:4546/location
 >>>>>>>>>>>>>>>>>>
> Restaurant wrt to city
http://localhost:4546/restaurants?city=3
(on the basis city return restaurants) 


>>>>>>>>>>>>>>>>>>
> List of all meal 
(return all the meal types) 
http://localhost:4546/mealtype
>>>>>>>>>>>>>>>>>>

Page2(Listing Page)
> Find Restaurant on the basis mealType  >>>>>>>>>>>>>>>>>>
http://localhost:4546/filter/6
(this will return all the restaurant of particular meal)

> Filter
>> Cuisine Filter >>>>>>>>>>>>>>>>>>
http://localhost:4546/filter/3?cuisine=4
(Search on basis of mealtype and cuisine) done

>> cost Filter 
http://localhost:4546/filter/1?lcost=500&hcost=1000
(Search on basis of mealtype and cost)

>> sort filter
http://localhost:4546/filter/1?lcost=500&hcost=2000&sortKey=-1
(Price high to low and Low to High)

>> Cuisine + Cost
http://localhost:4546/filter/1?lcost=500&hcost=1000&cuisine=2
((Search on basis of mealtype and cuisine + cost)

Page3(Details Page)
> Get the details of restaurant on basis of Id 
http://localhost:4546/restaurants/3
>>>>>>>>>>>>>>>>>>

> Menu wrt to restaurant 
http://localhost:4546/menu/2
(return all items of menu for particular restaurant)


***post data details ***

Page4(Summary Page)

> Menu wrt to all ids (post)> 
(provides item in basis of id)
http://localhost:4546/menuItem
> Post the order

(Insert order details in db)
http://localhost:4546/placeOrder


//update order with payment details
http://localhost:4546/orderStatus/7


//delete orders
http://localhost:4546/deleteOrder

Page5(Order Page)
> List all the order placed 
http://localhost:4546/orders
>>>>>>>>>>>>>>>>>>
