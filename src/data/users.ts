export interface User {
    userId: string;
    userName: string;
    email: string;
    role: string;
    status: string;
    date: string; 
  }
  
  const generateRandomUsers = (numUsers: number) => {
    const users: User[] = [];
    const roles = ["Admin", "User"];
    const statuses = ["Active", "Inactive", "Pending"];
    for (let i = 0; i < numUsers; i++) {
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const randomDay = Math.floor(Math.random() * 28) + 1;
      const date = `2023-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`;
      users.push({
        userId: String(i + 1),
        userName: `User${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: roles[Math.floor(Math.random() * roles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date,
      });
    }
    return users;
  };
  
  export const initialUserData: User[] = generateRandomUsers(50);
  
  export const roles = ["Admin", "User", "Guest"];
  export const statuses = ["Active", "Inactive", "Pending"];
  
  export const totalUsers = initialUserData.length;
  