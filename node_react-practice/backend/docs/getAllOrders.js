/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve all orders
 *     description: Fetches a list of all orders including customer name, warehouse name, order date, status, and total amount.
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   order_id:
 *                     type: integer
 *                     description: The unique identifier for the order
 *                   customer_name:
 *                     type: string
 *                     description: The name of the customer who placed the order
 *                   warehouse_name:
 *                     type: string
 *                     description: The name of the warehouse associated with the order
 *                   order_date:
 *                     type: string
 *                     format: date
 *                     description: The date when the order was placed
 *                   status:
 *                     type: string
 *                     description: The current status of the order
 *                   total_amount:
 *                     type: number
 *                     format: float
 *                     description: The total amount of the order
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
