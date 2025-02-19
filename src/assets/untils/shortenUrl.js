export async function shortenUrl(url) {
  try {
    // Извлекаем данные заказа из URL
    const dataParam = decodeURIComponent(url.split('data=')[1]);
    const orderData = JSON.parse(dataParam);

    // Генерируем короткий ID заказа (6 символов)
    const orderId = Math.random().toString(36).substring(2, 8);

    // Сохраняем данные заказа в localStorage
    localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));

    // Создаем короткую ссылку только с ID
    const shortUrl = `${window.location.origin}/Tabys-Stroy/#/zakaz/${orderId}`;
    
    return shortUrl;

  } catch (error) {
    console.error("Ошибка создания короткой ссылки:", error);
    return url;
  }
}