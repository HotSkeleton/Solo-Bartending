import express from 'express';

const app = express();
var cors = require('cors')

// SEPARATE THESE INTO ANOTHER FILE
const Drink: {
    name: string,
    specialInstructions?: string
}[] = [];
const Order: {
    id:number
    drinkOrder: typeof Drink[]
}[] = [];

// Could include a description
const menuItems: string[] = ["Manhattan", "Negroni", "Martini", "Daiquiri", "Old Fashioned", "Whiskey Sour", "Sidecar", "Mojito", "Bloody Mary", "Margarita"];
// END OF "THESE"

const ErrorMessage: {status:number, message:string}[] = [];
const InternalServerMessage: {status:number, message:string}[] = [];
const NotFoundMessage: {status:number, message:string}[] = [];
const NoAuthMessage: {status:number, message:string}[] = [];
const ForbiddenMessage: {status:number, message:string}[] = [];
const InfoMessage: {status:number, message:string}[] = [];

let orderCounter = 0;

// Grab the menu
app.get('/menu', (req,res,next) => {
    res.status(200);
    res.json(menuItems);
});

// Create an order
app.post('/orders', (req,res,next) => {
    if (req.body.drinkOrder === undefined && req.body.drinkOrder.kind != typeof [Drink]) {
        res.statusCode = 400;
        next(new Error('An error occurred'));
    }
    else {
        orderCounter++;

        Order.push({
            id: orderCounter, 
            drinkOrder: req.body.drinkOrder
        })

        res.status(201);
        res.json(Order.find(Order => Order.id == orderCounter));
    }
});

// Get all Orders
app.get('/orders', (req,res,next) => {
    res.status(200);
    res.json(Order);
});

// Get a specific Order
app.get('/orders/:id', (req,res,next) => {
    let tempOrder =  Order.find(Order => Order.id == parseInt(req.params.id as string))
    if (!tempOrder) {
        res.statusCode = 404;
        next(new Error('Order not found'));
    } else {
        res.status(200);
        res.json(tempOrder);
    }
});

// Edit an Order
app.patch('/orders/:id', (req,res,next) => {
    let tempOrder = Order.find(Order => Order.id == parseInt(req.params.id as string));
    if (!tempOrder) {
        res.statusCode = 404;
        next(new Error('Order not found'));
    } else if (req.body.drinkOrder === undefined && req.body.drinkOrder.kind != typeof [Drink]) {
        res.statusCode = 400;
        next(new Error('An error occurred'));
    } else {
        Order.find(Order => Order.id == parseInt(req.params.id as string))!.drinkOrder = req.body.drinkOrder;
        res.status(204);
        res.json({status: 200, message: "Order updated!"});
    }
});

// Delete a specific order
app.delete('/order/:id', (req,res,next) => {
    let tempOrder = Order.find(Order => Order.id == parseInt(req.params.id as string));
    if (!tempOrder) {
        res.statusCode = 404;
        next(new Error('Todo List not found'));
    } else {
        Order.splice(Order.findIndex(Order => Order.id == parseInt(req.params.id as string)), 1);
        res.status(204);
        res.json({status: 204, message: "Order deleted!"});
    }
});

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.use((err:unknown, req:express.Request, res:express.Response, next:express.NextFunction)   =>{
     const errorMessage = err instanceof Error ? err.message : 'Unknown error';
     const statusCode = res.statusCode && res.statusCode !==200 ? res.statusCode : 500;
     res.status(statusCode);
     res.json({status: statusCode, message: errorMessage});
});

app.listen(3000, () => {
    console.log('Server is listening! check localhost\:3000')
});