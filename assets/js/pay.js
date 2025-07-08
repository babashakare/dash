        const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8iGURYuLh2FqrlnZhYncz7AuUtN-nR8T1IAJDMAa6o9awn7jlmcGFWz9Wn8dKIxlSLqOBMxOL3vIe/pubhtml'; // لینک منتشر شده را اینجا قرار دهید

        async function fetchData() {
            const response = await fetch(SHEET_URL);
            const data = await response.text();
            const parsedData = new window.DOMParser().parseFromString(data, "text/html");
            const rows = parsedData.querySelectorAll("table tbody tr");
            let dataArray = [];

            // استخراج داده‌ها از ردیف‌ها
            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll("td");
                const rowData = [];
                cells.forEach(cell => {
                    rowData.push(cell.innerText);
                });
                dataArray.push(rowData);
            }

            // مرتب‌سازی داده‌ها بر اساس تاریخ (فرض بر این است که تاریخ در ستون اول است)
            dataArray.sort((a, b) => new Date(b[0]) - new Date(a[0]));

            // نمایش داده‌ها در بخش‌های جداگانه
            for (let i = 0; i < Math.min(dataArray.length, 5); i++) {
                // نمایش داده‌ها در بخش‌های خاص
                document.getElementById(`time${i + 1}`).innerText = dataArray[i][0]; // ساعت
                document.getElementById(`user${i + 1}`).innerText = dataArray[i][1]; // نام کاربری
                document.getElementById(`number${i + 1}`).innerText = dataArray[i][2]; // بج نامبر
                document.getElementById(`pay${i + 1}`).innerText = dataArray[i][3]; // میزان پرداخت
            }
        }

        // بارگذاری اولیه داده‌ها
        fetchData();

        // به‌روزرسانی داده‌ها هر 10 ثانیه
        setInterval(fetchData, 10000); // 10000 میلی‌ثانیه = 10 ثانیه