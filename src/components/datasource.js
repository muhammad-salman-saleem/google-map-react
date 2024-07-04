export const chartData = [];

// Generating data for the years 2012 to 2017
for (let year = 2017; year <= 2017; year++) {
    for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const high = Math.floor(Math.random() * 100) + 50; 
            const low = Math.floor(Math.random() * high); 
            const open = Math.floor(Math.random() * (high - low)) + low; 
            const close = Math.floor(Math.random() * (high - low)) + low; 
            const volume = Math.floor(Math.random() * 50000) + 1000

            chartData.push({ x: date, high, low, open, close, volume });
        }
    }
}
