export type Visitor = {
    id: string;
    date: string;
  };
  
  const generateRandomVisitors = (numVisitors: number) => {
    const visitors: Visitor[] = [];
    for (let i = 0; i < numVisitors; i++) {
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const randomDay = Math.floor(Math.random() * 28) + 1;
      const date = `2023-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`;
      visitors.push({ id: `VIS${String(i + 1).padStart(3, '0')}`, date });
    }
    return visitors;
  };
  
  export const initialVisitorData: Visitor[] = generateRandomVisitors(125);
  