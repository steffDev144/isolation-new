export async function POST(request: NextRequest) {
    const bookingData = await request.json();

    // Отправка в Telegram вместо email
    const telegramMessage = `
🎯 НОВАЯ БРОНЬ НА КВЕСТ

👤 Клиент: ${bookingData.name}
📞 Телефон: ${bookingData.phone}
👥 Участники: ${bookingData.participants}
📅 Дата: ${bookingData.date || 'Не указана'}
⏰ Время: ${bookingData.time || 'Не указано'}
💰 Стоимость: ${bookingData.totalPrice || 'Не указана'}
    `.trim();

    // Отправка в Telegram
    await fetch(`https://api.telegram.org/bot7991931324:AAGgxgowTYau528ZS3NY5WBX1hMWSvjnIGU/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '1496174009',
        text: telegramMessage,
        parse_mode: 'HTML'
      })
    });

    return NextResponse.json({ success: true, message: 'Бронь отправлена!' }, {status: 200});
}
