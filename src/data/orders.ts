export type Order = {
  orderId: string;
  customerName: string;
  product: string;
  quantity: number;
  totalPrice: number;
  status: string;
  date: string;
  day: string;
};

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const generateRandomOrders = (numOrders: number, startDate: Date) => {
  const orders: Order[] = [];
  const statuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
  for (let i = 0; i < numOrders; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + Math.floor(Math.random() * 7));
    const dateString = date.toISOString().split('T')[0];
    const day = daysOfWeek[date.getDay()];
    orders.push({
      orderId: `ORD${String(i + 1).padStart(3, '0')}`,
      customerName: `Customer${i + 1}`,
      product: `Product${i + 1}`,
      quantity: Math.floor(Math.random() * 5) + 1,
      totalPrice: Math.floor(Math.random() * 1000) + 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: dateString,
      day: day,
    });
  }
  return orders;
};

const currentWeekStart = new Date();
currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());

const lastWeekStart = new Date(currentWeekStart);
lastWeekStart.setDate(lastWeekStart.getDate() - 7);

export const initialOrderData: Order[] = [
  ...generateRandomOrders(25, currentWeekStart),
  ...generateRandomOrders(25, lastWeekStart),
];

export const statuses = ["Processing", "Shipped", "Delivered", "Cancelled"];

export const totalProfit = initialOrderData.reduce((acc, order) => acc + order.totalPrice, 0);
